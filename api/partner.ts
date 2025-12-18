import { db, resend, emailTemplates, ADMIN_EMAIL, FROM_EMAIL } from './_utils.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // 1. Save to Firestore
    const docRef = await db.collection('partners').add({
      ...data,
      timestamp: FieldValue.serverTimestamp(),
    });

    // 2. Send User Confirmation Email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      ...emailTemplates.partnerUser(data),
    });

    // 3. Send Admin Notification Email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      ...emailTemplates.partnerAdmin(data),
    });

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error('Partnership Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
