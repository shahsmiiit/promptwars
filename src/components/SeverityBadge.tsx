import React from 'react';

export function SeverityBadge({ severity, confidence }: { severity: string; confidence: number }) {
  let bg = 'bg-gray-500';
  if (severity === 'critical') bg = 'bg-red-500';
  if (severity === 'low') bg = 'bg-green-500';
  
  return (
    <div className={bg}>
      {Math.round(confidence * 100)}%
      {confidence <= 0.5 && severity === 'high' && <span>low-confidence</span>}
    </div>
  );
}