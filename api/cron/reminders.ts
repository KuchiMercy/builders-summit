import { db, resend, emailTemplates, FROM_EMAIL, ADMIN_EMAIL } from '../_utils.js';

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

    // Check for 48 hours (2 days)
    if (diffDays === 2) {
      console.log("[CRON] Sending 48h reminder");
      templateToUse = emailTemplates.reminder48h;
      emailSubject = "48h Reminder";
      isReminderDay = true;
    }
    // Check for 24 hours (1 day)
    else if (diffDays === 1) {
      console.log("[CRON] Sending 24h reminder");
      templateToUse = emailTemplates.reminder24h;
      emailSubject = "24h Reminder";
      isReminderDay = true;
    }
    // Check for morning of event (0 days)
    else if (diffDays === 0) {
      console.log("[CRON] Sending morning-of-event reminder");
      templateToUse = emailTemplates.reminderMorning;
      emailSubject = "Morning-of-Event Reminder";
      isReminderDay = true;
    }
    else {
      console.log(`[CRON] No user reminder today (${diffDays} days left). Sending status to Admin.`);
    }

    let sentCount = 0;
    const adminData = { firstName: 'Admin', lastName: 'User', organization: 'Visionary Builders', role: 'Staff' };
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const [adminBase, adminDomain] = ADMIN_EMAIL.split('@');

    // Send previews to Admin (Always run daily)
    if (isReminderDay) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: `${adminBase}+preview@${adminDomain}`,
          ...templateToUse(adminData),
          subject: `[ADMIN PREVIEW] ${emailSubject}`
        });
        console.log(`[CRON] Sent ${emailSubject} preview to Admin`);
      } catch (err) {
        console.error(`[CRON] Failed to send preview to Admin:`, err);
      }
    } else {
      // Daily check: Send all three previews sequentially with delay to verify rate limiting
      const previews = [
        { template: emailTemplates.reminder48h, label: '48h Reminder', suffix: '48h' },
        { template: emailTemplates.reminder24h, label: '24h Reminder', suffix: '24h' },
        { template: emailTemplates.reminderMorning, label: 'Morning-of-Event Reminder', suffix: 'morning' }
      ];

      for (const { template, label, suffix } of previews) {
        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: `${adminBase}+${suffix}@${adminDomain}`,
            ...template(adminData),
            subject: `[DAILY CHECK] ${label} (${diffDays} days left)`
          });
          console.log(`[CRON] Sent ${label} preview to Admin (${suffix})`);
          // 500ms delay to verify/respect rate limits
          await sleep(500);
        } catch (err) {
          console.error(`[CRON] Failed to send ${label} preview to Admin:`, err);
        }
      }
    }

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
        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: data.email,
            ...templateToUse(data)
          });
          console.log(`[CRON] Sent ${emailSubject} to ${data.email}`);
          sentCount++;

          // 500ms delay to respect Resend rate limits (2 per second)
          await sleep(500);
        } catch (err) {
          console.error(`[CRON] Failed to send to ${data.email}:`, err);
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
