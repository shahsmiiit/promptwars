import { motion } from "framer-motion";
import { Brain, Shield, Activity } from "lucide-react";

const steps = [
  { icon: Brain, label: "Analyzing multimodal inputs...", delay: 0 },
  { icon: Activity, label: "Evaluating symptom severity...", delay: 1.2 },
  { icon: Shield, label: "Generating triage assessment...", delay: 2.4 },
];

const ProcessingStep = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <motion.div
        className="relative w-32 h-32 mb-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-primary" />
        <div className="absolute inset-3 rounded-full border-2 border-accent/20" />
        <div className="absolute inset-3 rounded-full border-b-2 border-accent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-10 h-10 text-primary" />
        </div>
      </motion.div>

      <div className="space-y-4 w-full max-w-xs">
        {steps.map(({ icon: Icon, label, delay }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-3 glass-card p-3"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingStep;
