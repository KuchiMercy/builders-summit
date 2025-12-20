import { db, resend, emailTemplates, FROM_EMAIL } from '../_utils.js';

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
    
    const diffTime = EVENT_DATE.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    console.log(`[CRON] Days until event: ${diffDays}`);

    let templateToUse = null;
    let emailSubject = "";

    // Check for 48 hours (2 days)
    if (diffDays === 2) {
      console.log("[CRON] Sending 48h reminder");
      templateToUse = emailTemplates.reminder48h;
      emailSubject = "48h Reminder";
    }
    // Check for 24 hours (1 day)
    else if (diffDays === 1) {
      console.log("[CRON] Sending 24h reminder");
      templateToUse = emailTemplates.reminder24h;
      emailSubject = "24h Reminder";
    }
    // Check for morning of event (0 days)
    else if (diffDays === 0) {
      console.log("[CRON] Sending morning-of-event reminder");
      templateToUse = emailTemplates.reminderMorning;
      emailSubject = "Morning-of-Event Reminder";
    }
    else {
      return res.status(200).json({ 
        message: 'No reminder scheduled for today', 
        daysUntilEvent: diffDays 
      });
    }

    const snapshot = await db.collection('registrations').get();
    
    if (snapshot.empty) {
      return res.status(200).json({ message: 'No registered users found' });
    }

    const emailPromises: Promise<any>[] = [];
    let sentCount = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.email && data.firstName) {
        const promise = resend.emails.send({
          from: FROM_EMAIL,
          to: data.email,
          ...templateToUse(data)
        }).then(() => {
          console.log(`[CRON] Sent ${emailSubject} to ${data.email}`);
          sentCount++;
        }).catch(err => {
          console.error(`[CRON] Failed to send to ${data.email}:`, err);
        });

        emailPromises.push(promise);
      }
    });

    await Promise.all(emailPromises);

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
