import { Resend } from 'resend';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Resend
export const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = getFirestore();

// Configuration
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'visionarybuilderssummit@gmail.com';
export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@visionarybuilderssummit.com';

// Email Templates
export const emailTemplates = {
  // Registration confirmation email
  registrationUser: (data: any) => ({
    subject: "Welcome to Visionary Builders Summit! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #000; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-label { font-weight: bold; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 You're Registered!</h1>
              <p>Welcome to the Visionary Builders Summit</p>
            </div>
            <div class="content">
              <h2>Hi ${data.firstName}!</h2>
              <p>Thank you for registering for the <strong>Visionary Builders Summit</strong>. We're thrilled to have you join us!</p>
              
              <div class="details">
                <h3>Your Registration Details:</h3>
                <div class="detail-row">
                  <span class="detail-label">Name:</span> ${data.firstName} ${data.lastName}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Email:</span> ${data.email}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Organization:</span> ${data.organization}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Role:</span> ${data.role}
                </div>
              </div>

              <p><strong>What's Next?</strong></p>
              <ul>
                <li>You'll receive event details and access links closer to the date</li>
                <li>Mark your calendar for the summit</li>
                <li>Connect with us on social media for updates</li>
              </ul>

              <div style="background: #eef2ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5;">
                <h3 style="margin-top: 0; color: #4f46e5;">Join the Conversation 💬</h3>
                <p>Connect with other builders before the summit starts!</p>
                <div style="margin-top: 15px;">
                  <a href="https://chat.whatsapp.com/IFxxRgwP0cQCWq00VjAt1M" style="display: inline-block; padding: 10px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-right: 10px; margin-bottom: 10px;">Join WhatsApp Group</a>
                  <a href="https://t.me/+bbWMiaunIjczODFk" style="display: inline-block; padding: 10px 20px; background: #0088cc; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-bottom: 10px;">Join Telegram Group</a>
                </div>
              </div>

              <p>If you have any questions, feel free to reach out to us at <a href="mailto:visionarybuilderssummit@gmail.com">visionarybuilderssummit@gmail.com</a></p>

              <p>See you at the summit!</p>
              <p><strong>The Visionary Builders Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 Visionary Builders Summit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Registration admin notification
  registrationAdmin: (data: any) => ({
    subject: `New Registration: ${data.firstName} ${data.lastName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .data-table { width: 100%; background: white; border-radius: 8px; overflow: hidden; }
            .data-table td { padding: 12px; border-bottom: 1px solid #eee; }
            .data-table td:first-child { font-weight: bold; color: #666; width: 40%; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Summit Registration</h2>
            </div>
            <div class="content">
              <table class="data-table">
                <tr><td>Name</td><td>${data.firstName} ${data.lastName}</td></tr>
                <tr><td>Email</td><td>${data.email}</td></tr>
                <tr><td>Phone</td><td>${data.phone}</td></tr>
                <tr><td>LinkedIn</td><td>${data.linkedin || 'N/A'}</td></tr>
                <tr><td>Location</td><td>${data.cityCountry}</td></tr>
                <tr><td>Organization</td><td>${data.organization}</td></tr>
                <tr><td>Role</td><td>${data.role}</td></tr>
                <tr><td>Industry</td><td>${data.industry}</td></tr>
                <tr><td>Experience</td><td>${data.experience || 'N/A'}</td></tr>
                <tr><td>Source</td><td>${data.source || 'N/A'}</td></tr>
                <tr><td>Goals</td><td>${data.goals || 'N/A'}</td></tr>
                <tr><td>Join Community</td><td>${data.community ? 'Yes' : 'No'}</td></tr>
                <tr><td>Registered At</td><td>${new Date().toLocaleString()}</td></tr>
              </table>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Contact form user confirmation
  contactUser: (data: any) => ({
    subject: "We received your message!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .message-box { background: white; padding: 20px; border-left: 4px solid #000; margin: 20px 0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Message Received</h1>
            </div>
            <div class="content">
              <h2>Hi ${data.name}!</h2>
              <p>Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.</p>
              
              <div class="message-box">
                <p><strong>Your Message:</strong></p>
                <p>${data.message}</p>
              </div>

              <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to us directly at <a href="mailto:visionarybuilderssummit@gmail.com">visionarybuilderssummit@gmail.com</a></p>

              <p>Best regards,<br><strong>The Visionary Builders Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Contact form admin notification
  contactAdmin: (data: any) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📧 New Contact Form Submission</h2>
            </div>
            <div class="content">
              <p><strong>From:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              
              <div class="message-box">
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Partnership form user confirmation
  partnerUser: (data: any) => ({
    subject: "Thank you for your partnership interest!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🤝 Partnership Interest Received</h1>
            </div>
            <div class="content">
              <h2>Hi ${data.fullName}!</h2>
              <p>Thank you for your interest in partnering with the <strong>Visionary Builders Summit</strong>!</p>
              
              <div class="details">
                <p><strong>Partnership Type:</strong> ${data.partnershipType}</p>
                <p><strong>Organization:</strong> ${data.orgName}</p>
              </div>

              <p>We've received your partnership inquiry and our team will review it carefully. We'll be in touch within 2-3 business days to discuss the next steps.</p>

              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our partnerships team will review your submission</li>
                <li>We'll send you our partnership deck with detailed information</li>
                <li>We'll schedule a call to discuss opportunities</li>
              </ul>

              <p>In the meantime, if you have any questions, please reach out to us at <a href="mailto:visionarybuilderssummit@gmail.com">visionarybuilderssummit@gmail.com</a></p>

              <p>Looking forward to building something great together!</p>
              <p><strong>The Visionary Builders Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Partnership form admin notification
  partnerAdmin: (data: any) => ({
    subject: `New Partnership Interest: ${data.orgName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .data-table { width: 100%; background: white; border-radius: 8px; overflow: hidden; }
            .data-table td { padding: 12px; border-bottom: 1px solid #eee; }
            .data-table td:first-child { font-weight: bold; color: #666; width: 40%; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🤝 New Partnership Interest</h2>
            </div>
            <div class="content">
              <table class="data-table">
                <tr><td>Contact Name</td><td>${data.fullName}</td></tr>
                <tr><td>Organization</td><td>${data.orgName}</td></tr>
                <tr><td>Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
                <tr><td>Phone</td><td>${data.phone}</td></tr>
                <tr><td>Partnership Type</td><td>${data.partnershipType}</td></tr>
                <tr><td>Goals/Reason</td><td>${data.reason}</td></tr>
                <tr><td>Submitted At</td><td>${new Date().toLocaleString()}</td></tr>
              </table>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // 48 Hour Reminder
  reminder48h: (data: any) => ({
    subject: "The Visionary Builders Summit is in 48 Hours! 🚀",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #000; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 48 Hours to Go!</h1>
              <p>Get Ready for the Visionary Builders Summit</p>
            </div>
            <div class="content">
              <h2>Hi ${data.firstName},</h2>
              <p>The countdown has truly begun! In just two days, we'll be gathering to shape the future of building.</p>
              
              <h3>Quick Checklist:</h3>
              <ul>
                <li>✅ Check your email for your unique entry QR code (coming tomorrow)</li>
                <li>✅ Review the <a href="https://visionarybuilderssummit.com/#schedule">event schedule</a></li>
                <li>✅ Prepare your questions for our speakers</li>
              </ul>

              <p>We can't wait to see you there!</p>
              <p><strong>The Visionary Builders Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // 24 Hour Reminder
  reminder24h: (data: any) => ({
    subject: "See You Tomorrow! Visionary Builders Summit 🎟️",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .location-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #000; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>👋 See You Tomorrow!</h1>
            </div>
            <div class="content">
              <h2>Hi ${data.firstName},</h2>
              <p>The wait is almost over. Tomorrow is the day!</p>
              
              <div class="location-box">
                <p><strong>📍 Venue:</strong> The Summit Center, 123 Innovation Drive</p>
                <p><strong>⏰ Registration Starts:</strong> 8:30 AM</p>
                <p><strong>🔑 Event Starts:</strong> 9:30 AM Sharp</p>
              </div>

              <h3>Arrival Tips:</h3>
              <ul>
                <li>Have your ID ready at registration</li>
                <li>Arrive early to network and grab coffee</li>
                <li>Dress code is Business Casual</li>
              </ul>

              <p>See you in the morning!</p>
              <p><strong>The Visionary Builders Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Morning-of-Event Reminder (Day 0)
  reminderMorning: (data: any) => ({
    subject: "Today is the Day! Visionary Builders Summit 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #F78628 0%, #ff9d4d 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #F78628; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .time-box { background: #1D1D1D; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="font-size: 36px; margin: 0;">🎉 TODAY IS THE DAY!</h1>
              <p style="font-size: 18px; margin: 10px 0 0 0;">Visionary Builders Summit</p>
            </div>
            <div class="content">
              <h2>Good Morning, ${data.firstName}! ☀️</h2>
              <p style="font-size: 18px;">The moment we've all been waiting for is finally here! Get ready for an incredible day of learning, networking, and building the future together.</p>
              
              <div class="time-box">
                <h3 style="margin-top: 0; color: #F78628;">⏰ EVENT STARTS IN A FEW HOURS</h3>
                <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">9:30 AM Sharp</p>
                <p style="margin: 0; opacity: 0.9;">Registration opens at 8:30 AM</p>
              </div>

              <div class="highlight-box">
                <h3 style="margin-top: 0; color: #1D1D1D;">📍 Event Details</h3>
                <p><strong>Venue:</strong> The Summit Center, 123 Innovation Drive</p>
                <p><strong>Registration:</strong> 8:30 AM - 9:30 AM</p>
                <p><strong>Opening Session:</strong> 9:30 AM</p>
                <p><strong>Dress Code:</strong> Business Casual</p>
              </div>

              <div style="background: #fff3e6; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #F78628;">
                <p style="margin: 0; font-size: 16px;"><strong>💡 Pro Tip:</strong> The best connections happen during breaks and networking sessions. Don't be shy—introduce yourself!</p>
              </div>

              <p style="font-size: 18px; margin-top: 30px;">We're so excited to see you today. Let's make this summit unforgettable!</p>
              <p><strong>See you in a few hours! 🚀</strong></p>
              <p><strong>The Visionary Builders Team</strong></p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};
