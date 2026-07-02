import { db, resend, emailTemplates, FROM_EMAIL, ADMIN_EMAIL } from '../_utils.js';
import { FieldValue } from 'firebase-admin/firestore';

// Set your event date here (YYYY-MM-DD format)
const EVENT_DATE = new Date('2026-03-28T09:00:00Z');

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization;
  if (req.query.key !== process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const today = new Date();
    // Calculate difference in calendar days
    const eventDateOnly = new Date(EVENT_DATE.getFullYear(), EVENT_DATE.getMonth(), EVENT_DATE.getDate());
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = eventDateOnly.getTime() - todayDateOnly.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    console.log(`[CRON] Days until event: ${diffDays}`);

    let templateToUse = emailTemplates.reminder48h; // Default for daily check
    let emailSubject = `${diffDays} Days until Event - System Check`;
    let isReminderDay = false;
    let reminderKey = '';

    // Check for 48 hours (2 days)
    if (diffDays === 2) {
      console.log("[CRON] Sending 48h reminder");
      templateToUse = emailTemplates.reminder48h;
      emailSubject = "48h Reminder";
      isReminderDay = true;
      reminderKey = 'reminder_48h';
    }
    // Check for 24 hours (1 day)
    else if (diffDays === 1) {
      console.log("[CRON] Sending 24h reminder");
      templateToUse = emailTemplates.reminder24h;
      emailSubject = "24h Reminder";
      isReminderDay = true;
      reminderKey = 'reminder_24h';
    }
    // Check for morning of event (0 days)
    else if (diffDays === 0) {
      console.log("[CRON] Sending morning-of-event reminder");
      templateToUse = emailTemplates.reminderMorning;
      emailSubject = "Morning-of-Event Reminder";
      isReminderDay = true;
      reminderKey = 'reminder_morning';
    }
    else {
      console.log(`[CRON] No user reminder today (${diffDays} days left). Sending status to Admin.`);
    }

    let sentCount = 0;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // (Admin preview functionality has been removed)
    if (!isReminderDay) {
      return res.status(200).json({
        success: true,
        message: 'Daily admin checks sent. No user reminders scheduled.',
        daysUntilEvent: diffDays
      });
    }

    const snapshot = await db.collection('registrations').get();

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No registered users found' });
    }

    // Sequential sending with delay
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.email && data.firstName) {
        // Skip if this specific reminder was already sent
        const remindersSent = data.remindersSent || [];
        if (remindersSent.includes(reminderKey)) {
          console.log(`[CRON] ${reminderKey} already sent to ${data.email}, skipping.`);
          continue;
        }

        let success = false;
        let attempts = 0;
        const maxAttempts = 3;

        while (!success && attempts < maxAttempts) {
          try {
            await resend.emails.send({
              from: FROM_EMAIL,
              to: data.email,
              ...templateToUse(data)
            });

            // Mark as sent in Firestore
            await doc.ref.update({
              remindersSent: FieldValue.arrayUnion(reminderKey)
            });

            console.log(`[CRON] Sent ${emailSubject} to ${data.email}`);
            sentCount++;
            success = true;

            // 500ms delay to respect Resend rate limits
            await sleep(500);
          } catch (err) {
            attempts++;
            console.error(`[CRON] Attempt ${attempts} failed for ${data.email}:`, err);

            if (attempts >= maxAttempts) {
              console.error(`[CRON] Giving up on ${data.email} after ${maxAttempts} attempts.`);
            } else {
              // Exponential backoff
              await sleep(1000 * attempts);
            }
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: `Sent ${sentCount} reminders`,
      type: emailSubject
    });

  } catch (error: any) {
    console.error('[CRON] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
