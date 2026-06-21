import { useState } from "react";
import type { RegistrationFormData } from "../schema/registrationSchema";

export const useRegistration = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitRegistration = async (data: RegistrationFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setStatus("success");
      return true;
    } catch (error: any) {
      console.error("Registration error:", error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return { status, errorMessage, submitRegistration, reset };
};
