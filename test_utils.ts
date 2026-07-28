import { emailTemplates } from './api/_utils.js';
console.log(emailTemplates.registrationUser({ registrationType: 'workshop', workshopId: 'ws-july-2026', firstName: 'John' }));
