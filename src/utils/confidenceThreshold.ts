export function getConfidenceLabel(confidence: number): string {
  if (confidence === 0) return "0%";
  if (confidence === 1) return "100%";
  if (confidence <= 0.5) return "low confidence - human review needed";
  return `${Math.round(confidence * 100)}%`;
}
