import { resend, FROM_EMAIL, ADMIN_EMAIL } from '../_utils.js';

export default async function handler(req: any, res: any) {
    const authHeader = req.headers.authorization;
    if (req.query.key !== process.env.CRON_SECRET &&
        authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        console.log('[CRON] Running test email job');

        const result = await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: "Test Cron Job Email",
            html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: sans-serif; padding: 20px;">
            <h1 style="color: #4f46e5;">🚀 Test Cron Job Successful!</h1>
            <p>This is a test email sent from the cron job at <strong>${new Date().toLocaleString()}</strong>.</p>
            <p>If you're seeing this, your Vercel cron job is working correctly!</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">Visionary Builders Summit Team</p>
          </body>
        </html>
      `
        });

        console.log('[CRON] Test email sent:', result);

        return res.status(200).json({
            success: true,
            message: 'Test email sent successfully',
            id: result.data?.id
        });

    } catch (error: any) {
        console.error('[CRON] Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
