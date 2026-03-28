import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: string;
  confidence: number;
}

export function SeverityBadge({ severity, confidence }: SeverityBadgeProps) {
  const bgClass = severity === 'critical' ? 'bg-red-500' : severity === 'low' ? 'bg-green-500' : 'bg-yellow-500';
  const lowConfidence = confidence < 0.6;

  return (
    <div className={cn("p-2 rounded", bgClass)}>
      {severity} - {Math.round(confidence * 100)}%
      {lowConfidence && <span>low-confidence</span>}
    </div>
  );
}