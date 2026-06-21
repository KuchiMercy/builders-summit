import { db } from '../_utils.js';
import { FieldValue } from 'firebase-admin/firestore';
import { ConflictError } from '../_utils/errors.js';

export class RegistrationRepository {
  async registerUser(collection: string, email: string, targetWorkshopIds: string[], data: any): Promise<string> {
    const userDocRef = db.collection(collection).doc(email);
    // Outbox reference for guaranteed email delivery
    const outboxDocRef = db.collection('outbox_events').doc(); 
    
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userDocRef);
      if (doc.exists) {
        const existingData = doc.data() || {};
        const existingWorkshopIds: string[] = existingData.workshopIds || [];
        
        const mergedIds = Array.from(new Set([...existingWorkshopIds, ...targetWorkshopIds]));
        
        if (mergedIds.length === existingWorkshopIds.length) {
           throw new ConflictError('This email is already registered for the selected workshop(s).');
        }
        
        transaction.update(userDocRef, {
          workshopIds: mergedIds,
          registerForAll: data.registerForAll || existingData.registerForAll || false,
          updatedAt: FieldValue.serverTimestamp()
        });
      } else {
        transaction.set(userDocRef, {
          ...data,
          email,
          workshopIds: targetWorkshopIds,
          timestamp: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
      }

      // Atomically insert the event into the outbox
      transaction.set(outboxDocRef, {
        type: 'USER_REGISTERED',
        payload: { email, targetWorkshopIds, data },
        status: 'PENDING',
        retryCount: 0,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    });

    return userDocRef.id;
  }
}
