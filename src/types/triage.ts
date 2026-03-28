export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface TriageResult {
  severity: SeverityLevel;
  severityScore: number; // 1-10
  confidence: number; // 0-1
  primarySymptoms: string[];
  summary: string;
  recommendedAction: string;
  urgencyLevel: string;
  careType: 'emergency' | 'urgent_care' | 'primary_care' | 'self_care';
  additionalNotes: string;
}

export interface TriageInput {
  voiceTranscript?: string;
  photos: string[]; // base64
  pdfText?: string;
}

export type AppStep = 'landing' | 'input' | 'processing' | 'result' | 'confirmed';
