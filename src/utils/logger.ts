export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    // In production, this could send to Datadog, Mixpanel, etc.
    console.info(`[INFO]: ${message}`, context || "");
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(`[WARN]: ${message}`, context || "");
  },
  error: (error: Error | string, context?: Record<string, unknown>) => {
    // In production, this would send to Sentry or similar service
    console.error(`[ERROR]:`, error, context || "");
    
    // Example Sentry integration placeholder:
    // if (import.meta.env.PROD) {
    //   Sentry.captureException(typeof error === 'string' ? new Error(error) : error, { extra: context });
    // }
  },
};
