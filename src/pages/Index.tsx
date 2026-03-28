import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LandingStep from "@/components/LandingStep";
import InputStep from "@/components/InputStep";
import ProcessingStep from "@/components/ProcessingStep";
import TriageResultStep from "@/components/TriageResultStep";
import ConfirmedStep from "@/components/ConfirmedStep";
import type { AppStep, TriageResult, TriageInput } from "@/types/triage";

const Index = () => {
  const [step, setStep] = useState<AppStep>("landing");
  const [result, setResult] = useState<TriageResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (input: TriageInput) => {
    setIsProcessing(true);
    setStep("processing");

    try {
      const { data, error } = await supabase.functions.invoke("triage", {
        body: {
          voiceTranscript: input.voiceTranscript,
          photos: input.photos,
          pdfText: input.pdfText,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setResult(data);
      setStep("result");
    } catch (e: any) {
      console.error(e);
      toast({
        title: "Analysis failed",
        description: e.message || "Could not complete triage. Please try again.",
        variant: "destructive",
      });
      setStep("input");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setStep("landing");
    setResult(null);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === "landing" && <LandingStep key="landing" onStart={() => setStep("input")} />}
        {step === "input" && <InputStep key="input" onSubmit={handleSubmit} isProcessing={isProcessing} />}
        {step === "processing" && <ProcessingStep key="processing" />}
        {step === "result" && result && (
          <TriageResultStep key="result" result={result} onConfirm={() => setStep("confirmed")} onReset={handleReset} />
        )}
        {step === "confirmed" && result && (
          <ConfirmedStep key="confirmed" result={result} onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
