import { db, resend, emailTemplates, ADMIN_EMAIL, FROM_EMAIL } from './_utils.js';
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // 1. Save to Firestore
    const docRef = await db.collection('contacts').add({
      ...data,
      timestamp: FieldValue.serverTimestamp(),
    });

    // 2. Send User Confirmation Email
    try {
      await resend.emails.send({
        from: `Visionary Builders <${FROM_EMAIL}>`,
        to: [data.email],
        ...emailTemplates.contactUser(data),
      });
      console.log(`[SUCCESS] Contact confirmation email sent to ${data.email}`);
    } catch (emailError: any) {
      console.error('Contact User Email Error:', emailError);
    }

    // 3. Send Admin Notification Email
    try {
      await resend.emails.send({
        from: `Visionary Builders <${FROM_EMAIL}>`,
        to: [ADMIN_EMAIL],
        ...emailTemplates.contactAdmin(data),
      });
      console.log(`[SUCCESS] Contact admin notification email sent to ${ADMIN_EMAIL}`);
    } catch (emailError: any) {
      console.error('Contact Admin Email Error:', emailError);
    }

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
