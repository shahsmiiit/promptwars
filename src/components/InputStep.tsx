import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Camera, FileText, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InputStepProps {
  onSubmit: (data: { voiceTranscript?: string; photos: string[]; pdfText?: string }) => void;
  isProcessing: boolean;
}

const InputStep = ({ onSubmit, isProcessing }: InputStepProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [pdfText, setPdfText] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser. Please type your description.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    let finalTranscript = transcript;
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript + interim);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfText(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const canSubmit = transcript.trim() || photos.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col min-h-screen px-5 py-8"
    >
      <h2 className="text-2xl font-bold font-display mb-1">Describe the situation</h2>
      <p className="text-sm text-muted-foreground mb-6">Voice, photos, and medical records help AI assess faster.</p>

      {/* Voice */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium flex items-center gap-2">
            <Mic className="w-4 h-4 text-accent" /> Voice Description
          </span>
          <Button
            size="sm"
            variant={isRecording ? "destructive" : "secondary"}
            onClick={isRecording ? stopRecording : startRecording}
            className="rounded-xl"
            aria-label={isRecording ? "Stop recording voice description" : "Start recording voice description"}
            aria-pressed={isRecording}
          >
            {isRecording ? <><MicOff className="w-4 h-4 mr-1" /> Stop</> : <><Mic className="w-4 h-4 mr-1" /> Record</>}
          </Button>
        </div>
        <textarea
          aria-label="Voice description text area"
          role="textbox"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Tap record or type what happened..."
          className="w-full bg-secondary/50 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 border-0 focus:outline-none focus:ring-1 focus:ring-accent"
        />
        {isRecording && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-primary pulse-emergency" />
            <span className="text-xs text-primary font-mono">Listening...</span>
          </div>
        )}
      </div>

      {/* Photos */}
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium flex items-center gap-2">
            <Camera className="w-4 h-4 text-accent" /> Injury Photos
          </span>
          <Button size="sm" variant="secondary" onClick={() => photoInputRef.current?.click()} className="rounded-xl" aria-label="Add injury photos">
            <Camera className="w-4 h-4 mr-1" /> Add
          </Button>
          <input ref={photoInputRef} type="file" accept="image/*" capture="environment" multiple onChange={handlePhoto} className="hidden" />
        </div>
        {photos.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {photos.map((p, i) => (
              <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden">
                <img src={p} alt={`Injury ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  aria-label={`Remove photo ${i + 1}`}
                  onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-background/80 flex items-center justify-center hover:bg-destructive/80 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">No photos added yet</p>
        )}
      </div>

      {/* PDF */}
      <div className="glass-card p-4 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" /> Medical Records
            <span className="text-xs text-muted-foreground">(optional)</span>
          </span>
          <Button size="sm" variant="secondary" onClick={() => pdfInputRef.current?.click()} className="rounded-xl" aria-label="Upload medical records">
            <FileText className="w-4 h-4 mr-1" /> Upload
          </Button>
          <input ref={pdfInputRef} type="file" accept=".pdf,application/pdf" onChange={handlePdf} className="hidden" />
        </div>
        {pdfName && (
          <div className="flex items-center gap-2 mt-3 text-xs text-accent">
            <FileText className="w-3 h-3" /> {pdfName}
            <button aria-label="Remove medical record" onClick={() => { setPdfName(null); setPdfText(null); }} className="hover:opacity-80">
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Button
          size="lg"
          aria-label={isProcessing ? "Analyzing inputs with AI..." : "Submit inputs to AI for analysis"}
          disabled={!canSubmit || isProcessing}
          onClick={() => onSubmit({ voiceTranscript: transcript || undefined, photos, pdfText: pdfText || undefined })}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-2xl glow-primary font-semibold disabled:opacity-40"
        >
          {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</> : <>Analyze with AI <ArrowRight className="w-5 h-5 ml-2" /></>}
        </Button>
      </div>
    </motion.div>
  );
};

export default InputStep;
