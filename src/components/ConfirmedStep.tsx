import { motion } from "framer-motion";
import { CheckCircle, Phone, MapPin, Navigation, RotateCcw, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TriageResult } from "@/types/triage";

interface ConfirmedStepProps {
  result: TriageResult;
  onReset: () => void;
}

const mockFacilities = [
  { name: "City General Hospital", distance: "0.8 mi", eta: "4 min", type: "Emergency Room" },
  { name: "QuickCare Urgent Clinic", distance: "1.2 mi", eta: "7 min", type: "Urgent Care" },
  { name: "Community Health Center", distance: "2.1 mi", eta: "12 min", type: "Primary Care" },
];

const ConfirmedStep = ({ result, onReset }: ConfirmedStepProps) => {
  const isEmergency = result.careType === "emergency";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen px-5 py-8"
    >
      {/* Status */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center mb-6"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${isEmergency ? 'bg-primary/10 glow-primary' : 'bg-severity-low/10 glow-accent'}`}>
          {isEmergency ? <Ambulance className="w-8 h-8 text-primary" /> : <CheckCircle className="w-8 h-8 text-severity-low" />}
        </div>
        <h2 className="text-xl font-bold font-display mb-1">
          {isEmergency ? "Dispatch Initiated" : "Care Route Ready"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isEmergency ? "Emergency services have been notified (mock)" : "Navigate to the nearest recommended facility"}
        </p>
      </motion.div>

      {isEmergency && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 mb-4 border border-primary/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Emergency Dispatch (Mock)</span>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground font-mono">
            <p>Status: <span className="text-primary">DISPATCHED</span></p>
            <p>Unit: EMT-42</p>
            <p>ETA: ~6 minutes</p>
            <p>Triage code sent to paramedics</p>
          </div>
        </motion.div>
      )}

      {/* Facilities */}
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-accent" /> Nearest Facilities
      </h3>
      <div className="space-y-3 mb-8">
        {mockFacilities.map((f, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className={`glass-card p-4 ${i === 0 ? 'border border-accent/30' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.type}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-accent">{f.eta}</p>
                <p className="text-xs text-muted-foreground">{f.distance}</p>
              </div>
            </div>
            <Button size="sm" variant="secondary" className="mt-3 w-full rounded-xl text-xs">
              <Navigation className="w-3 h-3 mr-1" /> Navigate
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto">
        <Button variant="secondary" onClick={onReset} className="w-full rounded-2xl py-5">
          <RotateCcw className="w-4 h-4 mr-2" /> New Triage
        </Button>
      </div>
    </motion.div>
  );
};

export default ConfirmedStep;
