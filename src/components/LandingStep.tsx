import { motion } from "framer-motion";
import { AlertTriangle, Mic, Camera, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingStepProps {
  onStart: () => void;
}

const LandingStep = ({ onStart }: LandingStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 glow-primary mb-6">
          <AlertTriangle className="w-12 h-12 text-primary" />
          <div className="absolute inset-0 rounded-2xl pulse-emergency bg-primary/5" />
        </div>
        <h1 className="text-4xl font-bold font-display tracking-tight mb-2">
          <span className="text-gradient-emergency">TriageAI</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xs mx-auto">
          Emergency Medical Bridge
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-6 mb-10 text-muted-foreground"
      >
        {[
          { icon: Mic, label: "Voice" },
          { icon: Camera, label: "Photo" },
          { icon: FileText, label: "Records" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          size="lg"
          onClick={onStart}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg rounded-2xl glow-primary font-semibold"
        >
          Start Triage
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-xs text-muted-foreground max-w-xs"
      >
        AI-assisted assessment only. Always call emergency services for life-threatening situations.
      </motion.p>
    </motion.div>
  );
};

export default LandingStep;
