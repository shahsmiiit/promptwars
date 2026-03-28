import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, ArrowRight, RotateCcw, Activity, Stethoscope, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackTriageCompleted, trackDispatchConfirmed, trackMapRendered, buildMapsEmbedUrl } from "@/services/google";
import { useEffect } from "react";
import type { TriageResult, SeverityLevel } from "@/types/triage";

interface TriageResultStepProps {
  result: TriageResult;
  onConfirm: () => void;
  onReset: () => void;
}

const severityConfig: Record<SeverityLevel, { color: string; bg: string; border: string; label: string }> = {
  critical: { color: "text-severity-critical", bg: "bg-severity-critical/10", border: "border-severity-critical/30", label: "CRITICAL" },
  high: { color: "text-severity-high", bg: "bg-severity-high/10", border: "border-severity-high/30", label: "HIGH" },
  medium: { color: "text-severity-medium", bg: "bg-severity-medium/10", border: "border-severity-medium/30", label: "MEDIUM" },
  low: { color: "text-severity-low", bg: "bg-severity-low/10", border: "border-severity-low/30", label: "LOW" },
  info: { color: "text-severity-info", bg: "bg-severity-info/10", border: "border-severity-info/30", label: "INFO" },
};

const TriageResultStep = ({ result, onConfirm, onReset }: TriageResultStepProps) => {
  useEffect(() => {
    trackTriageCompleted(result.severity, result.confidence);
  }, [result.severity, result.confidence]);

  useEffect(() => {
    if (result.careType !== 'self_care') {
      trackMapRendered(result.careType);
    }
  }, [result.careType]);

  const config = severityConfig[result.severity];
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen px-5 py-8"
    >
      <h2 className="text-xl font-bold font-display mb-4">Triage Assessment</h2>

      {/* Severity Banner */}
      <motion.div
        role="alert"
        aria-live="assertive"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className={`${config.bg} ${config.border} border rounded-2xl p-5 mb-4`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${config.color}`} />
            <span className={`text-sm font-bold font-mono ${config.color}`}>{config.label}</span>
          </div>
          <div className={`text-3xl font-bold font-mono ${config.color}`}>
            {result.severityScore}/10
          </div>
        </div>
        <div className="w-full bg-background/30 rounded-full h-2 mb-2">
          <div className={`h-2 rounded-full ${config.bg.replace('/10', '')} opacity-80`} style={{ width: `${result.severityScore * 10}%` }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>AI Confidence: {confidencePercent}%</span>
          <span>Urgency: {result.urgencyLevel}</span>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Stethoscope className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Summary</span>
        </div>
        <p className="text-sm text-secondary-foreground leading-relaxed">{result.summary}</p>
      </div>

      {/* Symptoms */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Identified Symptoms</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.primarySymptoms.map((s, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Recommended Action */}
      <div className="glass-card p-4 mb-4 border border-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Recommended Action</span>
        </div>
        <p className="text-sm text-secondary-foreground">{result.recommendedAction}</p>
      </div>

      {/* Care Routing & Facility Map */}
      <div className="glass-card p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold">Care Type & Facility</span>
        </div>
        <span className={`text-lg font-bold ${config.color} block mb-4 uppercase`}>
          {result.careType.replace('_', ' ')}
        </span>

        {result.careType === 'emergency' && result.severity === 'critical' ? (
          <a href="tel:112" className="block w-full text-center bg-red-600 text-white font-bold py-4 rounded-xl text-xl animate-pulse">
            🚨 CALL 112 IMMEDIATELY
          </a>
        ) : result.careType !== 'self_care' ? (
          <div className="mt-2 rounded-xl overflow-hidden border border-accent/20">
            <h3 className="text-xs bg-secondary px-3 py-2 text-secondary-foreground font-semibold">Nearest Care Facility</h3>
            <iframe
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={buildMapsEmbedUrl(result.careType)}
            ></iframe>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Monitor at home. Proceed to a clinic if symptoms worsen.</p>
        )}
      </div>

      {result.additionalNotes && (
        <p className="text-xs text-muted-foreground mb-6 italic">{result.additionalNotes}</p>
      )}

      <div className="mt-auto flex gap-3">
        <Button variant="secondary" onClick={onReset} className="rounded-2xl py-5 flex-1">
          <RotateCcw className="w-4 h-4 mr-2" /> Redo
        </Button>
        <Button
          onClick={() => {
            trackDispatchConfirmed(result.careType);
            onConfirm();
          }}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-5 flex-[2] glow-primary font-semibold"
        >
          <CheckCircle className="w-4 h-4 mr-2" /> Confirm & Route
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-4 opacity-70">
        AI-assisted guidance only. Always consult a medical professional.
      </p>
    </motion.div>
  );
};

export default TriageResultStep;
