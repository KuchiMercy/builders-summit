import { db, resend, emailTemplates, ADMIN_EMAIL, FROM_EMAIL } from './_utils.js';
console.log('[DEBUG] register.ts loaded. resend is:', typeof resend);
import { FieldValue } from 'firebase-admin/firestore';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Debug: Check if critical env vars are present (do not log values)
  console.log('[DEBUG] handler start. process.env.RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
  console.log('[DEBUG] process.env.VITE_FIREBASE_PROJECT_ID:', process.env.VITE_FIREBASE_PROJECT_ID);

  const envStatus = {
    resendKey: !!process.env.RESEND_API_KEY,
    firebaseProject: !!process.env.VITE_FIREBASE_PROJECT_ID,
    firebaseEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    firebaseKey: !!process.env.FIREBASE_PRIVATE_KEY,
    fromEmail: FROM_EMAIL,
  };

  try {
    const data = req.body;
    let step = 'init';

    // Route to the correct Firestore collection based on registration type
    const collection = data.registrationType === 'workshop'
      ? 'workshopRegistrations'
      : 'registrations';

    // Check for duplicate email within the same collection
    step = 'firebase_check_duplicate';
    const existing = await db.collection(collection)
      .where('email', '==', data.email)
      .get();

    if (!existing.empty) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    // Save to Firestore
    step = 'firebase_save';
    const docRef = await db.collection(collection).add({
      ...data,
      timestamp: FieldValue.serverTimestamp(),
    });

    // Send User Confirmation Email
    step = 'resend_user_email';
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        ...emailTemplates.registrationUser(data),
      });
    } catch (emailError: any) {
      console.error('User Email Error:', emailError);
      // Don't fail the whole request, but log it. 
      // Optionally continue or throw? 
      // For now, let's catch it so we know if this is the failure point.
      // If we want to ensure email sends, we should rethrow.
      throw new Error(`Failed to send user email: ${emailError.message}`);
    }

    // Send Admin Notification Email
    step = 'resend_admin_email';
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        ...emailTemplates.registrationAdmin(data),
      });
    } catch (emailError: any) {
      console.error('Admin Email Error:', emailError);
      // Non-critical?
    }

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      error: error.message,
      step: error.step || 'unknown',
      envStatus,
      // Include stack in dev/debug only, but useful here
      details: error.response?.data || error.code
    });
  }
}
