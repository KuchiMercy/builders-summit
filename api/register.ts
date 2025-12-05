import { db, resend, emailTemplates, ADMIN_EMAIL, FROM_EMAIL } from './_utils';
import * as admin from 'firebase-admin';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    
    // 0. Check for duplicate email
    const existing = await db.collection('registrations')
      .where('email', '==', data.email)
      .get();

    if (!existing.empty) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    // 1. Save to Firestore
    const docRef = await db.collection('registrations').add({
      ...data,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // 2. Send User Confirmation Email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      ...emailTemplates.registrationUser(data),
    });

    // 3. Send Admin Notification Email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      ...emailTemplates.registrationAdmin(data),
    });

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
