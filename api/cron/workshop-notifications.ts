import { db, resend, emailTemplates, FROM_EMAIL } from '../_utils.js';

export default async function handler(req: any, res: any) {
  const authHeader = req.headers.authorization;
  if (req.query.key !== process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, 4 is Thursday, 5 is Friday
    
    // Determine the template based on the day
    let templateFn: ((data: any) => any) | null = null;
    let label = '';
    
    if (dayOfWeek === 1) { // Monday
      templateFn = emailTemplates.notificationMonday;
      label = 'Monday';
    } else if (dayOfWeek === 4) { // Thursday
      templateFn = emailTemplates.notificationThursday;
      label = 'Thursday';
    } else if (dayOfWeek === 5) { // Friday
      templateFn = emailTemplates.notificationFriday;
      label = 'Friday';
    } else {
      return res.status(200).json({ message: 'No notification scheduled for today.', dayOfWeek });
    }

    const snapshot = await db.collection('workshopRegistrations').get();

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No workshop registrants found' });
    }

    const emailsToSend: any[] = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.email && data.firstName) {
        emailsToSend.push({
          from: FROM_EMAIL,
          to: data.email,
          ...templateFn(data)
        });
      }
    }

    // Resend batch endpoint supports up to 100 emails per request
    const chunkSize = 100;
    let sentCount = 0;

    for (let i = 0; i < emailsToSend.length; i += chunkSize) {
      const chunk = emailsToSend.slice(i, i + chunkSize);
      
      let success = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!success && attempts < maxAttempts) {
        try {
          await resend.batch.send(chunk);
          sentCount += chunk.length;
          success = true;
          console.log(`[CRON] Sent ${chunk.length} ${label} notifications (Batch ${i / chunkSize + 1})`);
        } catch (err) {
          attempts++;
          console.error(`[CRON] Batch attempt ${attempts} failed:`, err);
          if (attempts >= maxAttempts) {
            console.error(`[CRON] Giving up on batch ${i / chunkSize + 1}.`);
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: `Sent ${sentCount} ${label} notifications`,
    });

  } catch (error: any) {
    console.error('[CRON] Notification Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
