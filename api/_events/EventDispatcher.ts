import { resend, emailTemplates, ADMIN_EMAIL, FROM_EMAIL } from '../_utils.js';

export class EventDispatcher {
  /**
   * Dispatches an event asynchronously.
   * In a true enterprise serverless environment (like Vercel), 
   * this should use \`waitUntil()\` or be published to an external queue (e.g., SQS, Cloud Tasks, Inngest).
   */
  dispatch(eventName: string, payload: any): void {
    if (eventName === 'USER_REGISTERED') {
      this.handleUserRegistered(payload);
    }
  }

  private handleUserRegistered(payload: any): void {
    const { email, targetWorkshopIds, data } = payload;
    const emailData = { ...data, targetWorkshopIds };

    // Fire-and-forget: The HTTP response is NOT blocked by these promises.
    const promises = [
      resend.emails.send({
        from: `Visionary Builders <${FROM_EMAIL}>`,
        to: [email],
        ...emailTemplates.registrationUser(emailData),
      }).catch((err: any) => console.error('[EMAIL ERROR] User Confirmation Background Task:', err)),

      resend.emails.send({
        from: `Visionary Builders <${FROM_EMAIL}>`,
        to: [ADMIN_EMAIL],
        ...emailTemplates.registrationAdmin(emailData),
      }).catch((err: any) => console.error('[EMAIL ERROR] Admin Notification Background Task:', err))
    ];

    // In a fully durable system, you would check the result of these
    // and push to a Dead-Letter Queue (DLQ) if they fail.
    Promise.allSettled(promises);
  }
}
