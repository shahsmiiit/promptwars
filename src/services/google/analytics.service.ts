declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackTriageStarted(): void {
  window.gtag?.("event", "triage_started");
}

export function trackTriageCompleted(severity: string, confidence: number): void {
  window.gtag?.("event", "triage_completed", { severity, confidence });
}

export function trackDispatchConfirmed(careType: string): void {
  window.gtag?.("event", "dispatch_confirmed", { care_type: careType });
}

export function trackInputType(type: "voice" | "photo" | "pdf"): void {
  window.gtag?.("event", "input_submitted", { input_type: type });
}
