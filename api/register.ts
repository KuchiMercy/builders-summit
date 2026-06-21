import { workshopRegistrationSchema } from '../src/schema/workshopRegistrationSchema.js';
import { RegistrationService } from './_services/RegistrationService.js';
import { ApplicationError, RateLimitError } from './_utils/errors.js';
import { rateLimiter } from './_utils/rateLimiter.js';
import { logger } from '../src/utils/logger.js';

// Controller Layer: Only handles HTTP concerns (parsing, validation, security, response mapping)
const registrationService = new RegistrationService();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Security & Abuse Prevention
    // Note: Vercel specific headers like 'x-real-ip' or 'x-forwarded-for' could be used.
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    await rateLimiter.check(ip as string, 5, 60); // Max 5 requests per minute per IP

    // 2. Validation & Sanitization
    const parseResult = workshopRegistrationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: parseResult.error.issues,
      });
    }

    const data = parseResult.data;

    // Defense in depth: Honeypot check
    if (data.botField) {
      logger.info('Honeypot triggered, discarding bot request.', { ip });
      // Silently discard, return fake success
      return res.status(200).json({ success: true, id: 'bot-detected-ignored' });
    }

    // 3. Delegate to Business Service
    const result = await registrationService.registerUser(data);

    logger.info('User successfully registered.', { id: result.id, email: data.email });
    return res.status(200).json({ success: true, id: result.id });

  } catch (error: unknown) {
    // Determine IP for logging
    const ip = req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

    if (error instanceof RateLimitError) {
      logger.warn(`Rate limit exceeded for IP: ${ip}`, { ip });
      return res.status(error.statusCode).json({ error: error.message });
    }

    if (error instanceof ApplicationError) {
      logger.warn(`Registration blocked: ${error.message}`, { ip, type: error.code });
      return res.status(error.statusCode).json({ error: error.message });
    }

    // Ensure we don't leak PII into unredacted logs by only logging the error name/stack
    logger.error('Unhandled Registration Error', { 
      error: error instanceof Error ? error.message : 'Unknown Error',
      stack: error instanceof Error ? error.stack : undefined,
      ip
    });
    
    return res.status(500).json({
      error: 'An internal server error occurred while processing your registration.',
    });
  }
}
