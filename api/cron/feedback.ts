import { db, resend, emailTemplates, FROM_EMAIL, ADMIN_EMAIL } from '../_utils.js';
import { FieldValue } from 'firebase-admin/firestore';

// Set your feedback reminder schedule here
// This will send reminders 2 days after the event date
const EVENT_DATE = new Date('2026-03-28T09:00:00Z');
const FEEDBACK_REMINDER_DELAY_DAYS = 2; // Send feedback reminder 2 days after event

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization;
  if (req.query.key !== process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const today = new Date();
    // Calculate days since event
    const eventDateOnly = new Date(EVENT_DATE.getFullYear(), EVENT_DATE.getMonth(), EVENT_DATE.getDate());
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diffTime = todayDateOnly.getTime() - eventDateOnly.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    console.log(`[CRON] Days since event: ${diffDays}`);

    // Send feedback reminders from 2 days after the event onward
    if (diffDays < FEEDBACK_REMINDER_DELAY_DAYS) {
      console.log(`[CRON] Not yet time for feedback reminders (${diffDays} days since event, waiting for ${FEEDBACK_REMINDER_DELAY_DAYS}).`);
      return res.status(200).json({
        success: true,
        message: 'Not yet time for feedback reminders',
        daysSinceEvent: diffDays
      });
    }

    console.log("[CRON] Sending feedback reminders");

    const snapshot = await db.collection('registrations').get();

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No registered users found' });
    }

    let sentCount = 0;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Sequential sending with delay
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.email && data.firstName) {
        // Skip if feedback reminder was already sent
        const remindersSent = data.remindersSent || [];
        if (remindersSent.includes('feedback_reminder')) {
          console.log(`[CRON] feedback_reminder already sent to ${data.email}, skipping.`);
          continue;
        }

        let success = false;
        let attempts = 0;
        const maxAttempts = 3;

        while (!success && attempts < maxAttempts) {
          try {
            const template = emailTemplates.feedbackReminder(data);
            await resend.emails.send({
              from: FROM_EMAIL,
              to: data.email,
              subject: template.subject,
              html: template.html,
            });

            // Mark as sent in Firestore
            await doc.ref.update({
              remindersSent: FieldValue.arrayUnion('feedback_reminder')
            });

            console.log(`[CRON] Sent feedback reminder to ${data.email}`);
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
      message: `Sent ${sentCount} feedback reminders`,
      daysSinceEvent: diffDays
    });

  } catch (error: any) {
    console.error('[CRON] Error:', error);
    return res.status(500).json({ error: error.message });
  }
}