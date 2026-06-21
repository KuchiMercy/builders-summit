import { resend, emailTemplates, FROM_EMAIL } from './api/_utils.js';

async function testEmails() {
  const data = { firstName: "Stephen" };
  const toEmail = process.env.ADMIN_EMAIL || "test@example.com"; // Provide a real email here or ensure ADMIN_EMAIL is set in .env.local

  console.log(`Sending test emails to: ${toEmail}`);

  try {
    console.log("Sending Monday Template...");
    await resend.emails.send({ from: FROM_EMAIL, to: toEmail, ...emailTemplates.notificationMonday(data) });

    console.log("Sending Thursday Template...");
    await resend.emails.send({ from: FROM_EMAIL, to: toEmail, ...emailTemplates.notificationThursday(data) });

    console.log("Sending Friday Template...");
    await resend.emails.send({ from: FROM_EMAIL, to: toEmail, ...emailTemplates.notificationFriday(data) });

    console.log("✅ All test emails sent successfully!");
  } catch (error) {
    console.error("❌ Failed to send emails:", error);
  }
}

testEmails();
