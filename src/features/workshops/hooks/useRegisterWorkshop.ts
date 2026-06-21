import { useState, useCallback } from "react";
import type { WorkshopRegistrationFormData } from "../../../schema/workshopRegistrationSchema";
import { logger } from "../../../utils/logger";

export type RegStatus = "idle" | "submitting" | "success" | "error";

interface UseRegisterWorkshopResult {
  status: RegStatus;
  error: string | null;
  registerForWorkshop: (data: WorkshopRegistrationFormData) => Promise<void>;
  resetRegistration: () => void;
}

export const useRegisterWorkshop = (): UseRegisterWorkshopResult => {
  const [status, setStatus] = useState<RegStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const registerForWorkshop = useCallback(async (data: WorkshopRegistrationFormData) => {
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        // Use generic error if the server doesn't provide a safe message
        throw new Error(result?.error || 'Registration failed. Please try again later.');
      }

      setStatus("success");
      logger.info("Workshop registration successful", { workshopId: data.workshopId });
    } catch (err: any) {
      logger.error("Error submitting workshop registration", { error: err.message, workshopId: data.workshopId });
      setStatus("error");
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  }, []);

  const resetRegistration = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return {
    status,
    error,
    registerForWorkshop,
    resetRegistration,
  };
};
