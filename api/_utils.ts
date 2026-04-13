import { Resend } from 'resend';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log current directory and files to debug path issues
console.log('[DEBUG] __dirname (ESM):', __dirname);
console.log('[DEBUG] process.cwd():', process.cwd());
// Try multiple locations for .env.local
const possiblePaths = [
  path.resolve(process.cwd(), '.env.local'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '.env.local')
];

for (const envPath of possiblePaths) {
  if (fs.existsSync(envPath)) {
    console.log('[DEBUG] .env.local FOUND at:', envPath);
    dotenv.config({ path: envPath });
    break;
  }
}

// console.log('[DEBUG] Available env keys:', Object.keys(process.env).filter(k => k.includes('FIREBASE') || k.includes('RESEND')));

// Initialize Resend
let resendInstance: Resend | null = null;
export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    if (!resendInstance) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error('Missing RESEND_API_KEY. Please ensure it is set in your environment variables.');
      }
      resendInstance = new Resend(apiKey);
    }
    return (resendInstance as any)[prop];
  }
});

// here
// Initialize Firebase Admin
if (!getApps().length) {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [];
    if (!projectId) missing.push('VITE_FIREBASE_PROJECT_ID');
    if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
    if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');

    console.warn(`[WARNING] Firebase Admin initialization delayed/failed due to missing: ${missing.join(', ')}`);
    // Note: This will cause db access to fail later, but prevents startup crash
  } else {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.includes('\\n')
          ? privateKey.replace(/\\n/g, '\n')
          : privateKey.replace(/\n\s*/g, '\n'), // Standardize multi-line
      }),
    });
  }
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

              <p>If you have any questions, feel free to reach out to us at <a href="mailto:contact@visionarybuilderssummit.com">contact@visionarybuilderssummit.com</a></p>

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

              <p>We typically respond within 24-48 hours. If your inquiry is urgent, please feel free to reach out to us directly at <a href="mailto:contact@visionarybuilderssummit.com">contact@visionarybuilderssummit.com</a></p>

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

              <p>In the meantime, if you have any questions, please reach out to us at <a href="mailto:contact@visionarybuilderssummit.com">contact@visionarybuilderssummit.com</a></p>

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
              <p>Visionary Builders Summit</p>
            </div>
            <div class="content">
              <h2>Hi ${data.firstName},</h2>
              <p>The countdown has truly begun! In just two days, we'll be gathering to shape the future of building.</p>
              
              <h3>Quick Checklist:</h3>
              <ul>
                <li>Check your email for your unique entry link (coming tomorrow)</li>
                <li>Review the <a href="https://www.canva.com/design/DAHEACkU_Wk/L82o6Y9PYsb4kfmU-bELcQ/view?utm_content=DAHEACkU_Wk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha8c408aa8a">event schedule</a></li>
                <li>Prepare your questions for our speakers</li>
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
                <p><strong>📍 Venue:</strong> <a href="https://www.youtube.com/watch?v=Zv60d1-UyIg">YouTube Live Stream</a></p>
                <p><strong>⏰ Check-in Starts:</strong> 10:50 AM</p>
                <p><strong>🔑 Event Starts:</strong> 11:00 AM Prompt</p>
              </div>

              <h3>Tips:</h3>
              <ul>
                <li>Review the <a href="https://www.canva.com/design/DAHEACkU_Wk/L82o6Y9PYsb4kfmU-bELcQ/view?utm_content=DAHEACkU_Wk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha8c408aa8a">event schedule</a></li>
                <li>Log in a few minutes early to confirm your connection</li>
                <li>Secure your space</li>
                <li>Eliminate all distractions</li>
                <li>Ensure strong internet connection and stable power</li>
                <li>Have a pad or note to write down strategies</li>
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
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
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
                <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">11:00 AM Prompt</p>
                <p style="margin: 0; opacity: 0.9;">Check-in starts at 10:50 AM</p>
              </div>

              <div class="highlight-box">
                <h3 style="margin-top: 0; color: #1D1D1D;">📍 Event Details</h3>
                <p><strong>Venue:</strong> <a href="https://www.youtube.com/watch?v=Zv60d1-UyIg">YouTube Live Stream</a></p>
                <p><strong>Stream Starts:</strong> 11:00 AM</p>
                <p><strong>Event Schedule:</strong> <a href="https://www.canva.com/design/DAHEACkU_Wk/L82o6Y9PYsb4kfmU-bELcQ/view?utm_content=DAHEACkU_Wk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=ha8c408aa8a">Review Here</a></p>
              </div>

              <p>The value of what is shared today depends entirely on your presence.</p>
              <ul>
                <li>Log in a few minutes early to confirm your connection</li>
                <li>Secure your space</li>
                <li>Eliminate all distractions</li>
                <li>Ensure strong internet connection and stable power</li>
                <li>Have a pad or note to write down strategies</li>
              </ul>

              <p>Commit to the process. We begin shortly.</p>

              <div style="background: #fff3e6; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #F78628;">
                <p style="margin: 0; font-size: 16px;"><strong>💡 Pro Tip:</strong> The best events happen with audience engagement. Don't be shy, use the comment section!</p>
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

  // Thank You Message (Post-Event)
  thankYou: (data: any) => ({
    subject: "Thank You for Being Part of the Visionary Builders Summit 🚀",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #000; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .community-box { background: #eef2ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 25px; background: #000; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="font-size: 28px; margin: 0;">Thank You for Being Part of the Visionary Builders Summit</h1>
            </div>
            <div class="content">
              <h2>Dear ${data.firstName || 'Visionary Builder'},</h2>
              
              <p>Thank you for being a part of the <strong>Visionary Builders Summit 1.0</strong>. Your presence, engagement, and energy truly made this experience impactful and memorable.</p>
              
              <div class="highlight-box">
                <p>From the powerful insights shared to your active engagement, this summit was more than just an event, it was a movement of visionaries committed to growth, purpose, and transformation. We are honoured that you chose to journey with us.</p>
              </div>

              <p>We would also like to specially appreciate our media partner, <strong>Pressdia</strong>, for their outstanding support in amplifying the vision and helping us reach a wider audience. Their contribution played a significant role in the success of this summit.</p>

              <p>As we wrap up this edition, we encourage you to reflect on the lessons learned, take bold action, and continue building the vision you carry. This is only the beginning.</p>

              <div class="community-box">
                <h3 style="margin-top: 0; color: #4f46e5;">We'd Love to Hear From You 💬</h3>
                <p>We would love to hear your feedback, key takeaways, and how this summit has impacted you. Also join the Visionary Builders Community.</p>
                <div style="margin-top: 15px;">
                  <a href="https://chat.whatsapp.com/IFxxRgwP0cQCWq00VjAt1M" class="button" style="background: #25D366;">Join the Community</a>
                </div>
              </div>

              <p>Thank you once again for being part of something truly special.</p>
              
              <p style="font-size: 18px; margin-top: 30px;"><strong>Stay connected. Stay visionary.</strong></p>
              
              <p>With gratitude,<br><strong>The Visionary Builders Summit Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2026 Visionary Builders Summit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
  
  // Feedback Request (Initial)
  feedbackRequest: (data: any) => ({
    subject: "Quick question about the Summit",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
            .content { font-size: 16px; }
            .footer { margin-top: 40px; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px; }
            .button { display: inline-block; padding: 12px 24px; background: #000; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-weight: 500; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <strong style="font-size: 18px;">Visionary Builders Summit</strong>
            </div>
            <div class="content">
              <p>Hi ${data.firstName || 'there'},</p>
              
              <p>I'm checking in to see how you found the <strong>Visionary Builders Summit</strong> sessions. We're already looking at how we can make the next one even better for our community.</p>
              
              <p>Could you take a minute to share your thoughts? Your perspective on what was most valuable would be very helpful.</p>
              
              <p>You can share your experience here:</p>
              
              <div style="text-align: left;">
                <a href="https://forms.gle/oqJ34ZMahuKQMnwdA" class="button">Submit your thoughts</a>
              </div>

              <p>Thank you for being part of the Summit and for your time.</p>
              
              <p>Best regards,<br>The Visionary Builders Summit Team</p>
            </div>
            <div class="footer">
              <p>© 2026 Visionary Builders Summit. You received this because you registered for the Summit.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),

  // Feedback Reminder (2 Days Later)
  feedbackReminder: (data: any) => ({
    subject: "Following up: Visionary Builders Summit",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #000 0%, #333 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 25px; background: #000; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <strong style="font-size: 18px;">Visionary Builders Summit</strong>
            </div>
            <div class="content">
              <p>Hi ${data.firstName || 'there'},</p>
              
              <p>Just a quick note to follow up on the feedback request for the <strong>Visionary Builders Summit</strong>. We haven't heard from you yet and would really appreciate your thoughts.</p>
              
              <p>Your experience helps us ensure future editions are as valuable as possible.</p>
              
              <div style="text-align: left;">
                <a href="https://forms.gle/oqJ34ZMahuKQMnwdA" class="button">Submit your thoughts</a>
              </div>

              <p>Every response counts and it only takes a minute.</p>
              
              <p>Thank you,<br>The Visionary Builders Summit Team</p>
            </div>
            <div class="footer">
              <p>© 2026 Visionary Builders Summit. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }),
};
