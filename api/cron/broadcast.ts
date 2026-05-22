import { db, resend, emailTemplates, FROM_EMAIL } from '../_utils.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req: any, res: any) {
  // Only allow GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth check
  const authHeader = req.headers.authorization;
  if (req.query.key !== process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let subject = '';
    let message = '';
    let target: 'all' | 'summit' | 'workshop' = 'summit';
    let ctaText = '';
    let ctaUrl = '';
    let broadcastDocRef: any = null;

    if (req.method === 'GET') {
      // 1. Queue mode: Read the oldest pending broadcast from Firestore
      console.log('[CRON BROADCAST] Checking for pending broadcasts in Firestore...');
      const pendingBroadcasts = await db.collection('broadcasts')
        .where('status', '==', 'pending')
        .orderBy('createdAt', 'asc')
        .limit(1)
        .get();

      if (pendingBroadcasts.empty) {
        console.log('[CRON BROADCAST] No pending broadcasts in queue.');
        return res.status(200).json({
          success: true,
          message: 'No pending broadcasts in queue.'
        });
      }

      const doc = pendingBroadcasts.docs[0];
      broadcastDocRef = doc.ref;
      const bData = doc.data();
      subject = bData.subject;
      message = bData.message;
      target = bData.target || 'summit';
      ctaText = bData.ctaText || '';
      ctaUrl = bData.ctaUrl || '';

      console.log(`[CRON BROADCAST] Found pending broadcast: "${subject}" targeting ${target}`);
      
      // Update status to 'sending' immediately to lock it
      await broadcastDocRef.update({
        status: 'sending',
        startedAt: FieldValue.serverTimestamp()
      });
    } else {
      // 2. Direct POST mode: Send immediately using provided request body
      const data = req.body;
      subject = data.subject;
      message = data.message;
      target = data.target || 'summit';
      ctaText = data.ctaText || '';
      ctaUrl = data.ctaUrl || '';

      if (!subject || !message) {
        return res.status(400).json({ error: 'Missing subject or message' });
      }

      console.log(`[CRON BROADCAST] Direct POST request for broadcast: "${subject}" targeting ${target}`);
    }

    // 3. Fetch recipients based on target
    const recipients: Map<string, { email: string; firstName: string }> = new Map();

    if (target === 'summit' || target === 'all') {
      console.log('[CRON BROADCAST] Fetching summit registrants...');
      const snapshot = await db.collection('registrations').get();
      snapshot.forEach(doc => {
        const d = doc.data();
        if (d.email && d.firstName) {
          recipients.set(d.email.toLowerCase().trim(), {
            email: d.email.trim(),
            firstName: d.firstName.trim()
          });
        }
      });
    }

    if (target === 'workshop' || target === 'all') {
      console.log('[CRON BROADCAST] Fetching workshop registrants...');
      const snapshot = await db.collection('workshopRegistrations').get();
      snapshot.forEach(doc => {
        const d = doc.data();
        if (d.email && d.firstName) {
          recipients.set(d.email.toLowerCase().trim(), {
            email: d.email.trim(),
            firstName: d.firstName.trim()
          });
        }
      });
    }

    const totalRecipients = recipients.size;
    console.log(`[CRON BROADCAST] Found ${totalRecipients} unique recipients.`);

    if (totalRecipients === 0) {
      if (broadcastDocRef) {
        await broadcastDocRef.update({
          status: 'completed',
          completedAt: FieldValue.serverTimestamp(),
          sentCount: 0,
          failedCount: 0,
          totalRecipients: 0
        });
      }
      return res.status(200).json({
        success: true,
        message: 'No recipients found to send to.'
      });
    }

    // 4. Send Emails sequentially
    let sentCount = 0;
    let failedCount = 0;
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const [_, recipient] of recipients) {
      const template = emailTemplates.broadcast({
        firstName: recipient.firstName,
        subject,
        message,
        ctaText,
        ctaUrl
      });

      try {
        await resend.emails.send({
          from: `Visionary Builders <${FROM_EMAIL}>`,
          to: [recipient.email],
          subject: template.subject,
          html: template.html
        });
        
        sentCount++;
        console.log(`[CRON BROADCAST] Sent to ${recipient.email}`);
        
        // 250ms delay to satisfy rate limits
        await sleep(250);
      } catch (err) {
        failedCount++;
        console.error(`[CRON BROADCAST] Failed to send to ${recipient.email}:`, err);
      }
    }

    console.log(`[CRON BROADCAST] Broadcast finished. Sent: ${sentCount}, Failed: ${failedCount}`);

    // 5. Update broadcast status in Firestore if queue mode
    if (broadcastDocRef) {
      await broadcastDocRef.update({
        status: 'completed',
        completedAt: FieldValue.serverTimestamp(),
        sentCount,
        failedCount,
        totalRecipients
      });
    }

    return res.status(200).json({
      success: true,
      message: `Broadcast finished.`,
      sentCount,
      failedCount,
      totalRecipients
    });

  } catch (error: any) {
    console.error('[CRON BROADCAST] Global Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
