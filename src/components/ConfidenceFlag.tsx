interface ConfidenceFlagProps {
  confidence: number;
  flags: string[];
}

export function ConfidenceFlag({ confidence, flags }: ConfidenceFlagProps) {
  return (
    <div>
      {confidence < 0.6 && <span>Human review required</span>}
      {flags.map(flag => <span key={flag} className="badge">{flag}</span>)}
    </div>
  );
}