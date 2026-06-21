import { db } from '../_utils.js';
import { RateLimitError } from './errors.js';

export class DistributedRateLimiter {
  async check(ip: string, limit: number, windowSeconds: number): Promise<void> {
    // Sanitize IP to be a valid Firestore document ID (no slashes)
    const sanitizedIp = ip.replace(/[\/\\]/g, '_');
    const ref = db.collection('rateLimits').doc(`ip_${sanitizedIp}`);
    const now = Date.now();
    const windowStart = now - (windowSeconds * 1000);

    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(ref);
      let requests: number[] = [];
      
      if (doc.exists) {
        // Filter requests to only include those within the current rolling window
        requests = (doc.data()?.requests || []).filter((timestamp: number) => timestamp > windowStart);
      }
      
      if (requests.length >= limit) {
        throw new RateLimitError();
      }
      
      requests.push(now);
      transaction.set(ref, { requests, updatedAt: now }, { merge: true });
    });
  }
}

export const rateLimiter = new DistributedRateLimiter();
