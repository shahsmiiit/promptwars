export interface ParsedTriageResponse {
  severity: string;
  confidence: number;
  flags: string[];
}

export function parseTriageResponse(jsonString: string): ParsedTriageResponse | { error: string } {
  try {
    const data = JSON.parse(jsonString);
    return {
      severity: data.severity || 'unknown',
      confidence: data.confidence ?? 0.5,
      flags: data.confidence < 0.6 ? ['low-confidence'] : [],
    };
  } catch {
    return { error: 'Parse Error' };
  }
}