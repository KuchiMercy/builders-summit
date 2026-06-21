import { RegistrationRepository } from '../_repositories/RegistrationRepository.js';
import { allWorkshops } from '../../src/data/workshops.js';

export class RegistrationService {
  constructor(
    private readonly repository = new RegistrationRepository()
  ) {}

  async registerUser(data: any): Promise<{ id: string }> {
    const targetWorkshopIds = this.determineWorkshopIds(data);
    const collection = data.registrationType === 'workshop' ? 'workshopRegistrations' : 'registrations';
    const email = data.email.toLowerCase().trim();

    // Persist data and write to outbox in a single transaction (Transactional Outbox Pattern)
    const userId = await this.repository.registerUser(collection, email, targetWorkshopIds, data);

    // External side-effects (Emails) are now fully decoupled. 
    // They are processed by a background worker reading the 'outbox_events' collection.

    return { id: userId };
  }

  private determineWorkshopIds(data: any): string[] {
    if (data.registerForAll) {
      const now = new Date();
      return allWorkshops
        .filter(w => new Date(w.date) > now || w.isActive)
        .map(w => w.id);
    }
    return data.workshopId ? [data.workshopId] : [];
  }
}
