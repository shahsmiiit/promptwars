/**
 * Google Cloud Logging Integration
 * Automatically structures JSON payloads to match Google Cloud Logging formatting
 * for advanced telemetry inside Google Cloud Run.
 */
export const logToGoogleCloud = (severity: string, message: string, meta: any = {}) => {
  const payload = {
    severity: severity.toUpperCase(),
    message,
    ...meta,
    logging_client: "google-cloud-sdk/triage-ai"
  };
  
  // In production, this emits stdout structurally for Google Cloud Logging agent
  console.log(JSON.stringify(payload));
  return true;
};
