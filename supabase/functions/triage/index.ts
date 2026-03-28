import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are TriageAI, an emergency medical triage assistant. You analyze patient descriptions, injury photos, and medical records to produce structured triage assessments.

IMPORTANT: You are an AI assistant providing preliminary assessment only. Always recommend professional medical evaluation.

Analyze the provided information and return a JSON object with EXACTLY this structure:
{
  "severity": "critical" | "high" | "medium" | "low" | "info",
  "severityScore": <number 1-10>,
  "confidence": <number 0.0-1.0>,
  "primarySymptoms": [<string array of identified symptoms>],
  "summary": "<brief clinical summary>",
  "recommendedAction": "<specific recommended next steps>",
  "urgencyLevel": "Immediate" | "Urgent" | "Semi-urgent" | "Non-urgent",
  "careType": "emergency" | "urgent_care" | "primary_care" | "self_care",
  "additionalNotes": "<any caveats or additional observations>"
}

Be thorough but concise. Include confidence scores reflecting certainty given the information provided. If images show injuries, describe what you observe. Always err on the side of caution.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { voiceTranscript, photos, pdfText } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    // Build multimodal content for Gemini REST API
    const parts: any[] = [];
    
    if (voiceTranscript) {
      parts.push({ text: `Patient/bystander description: "${voiceTranscript}"` });
    }

    if (photos && photos.length > 0) {
      parts.push({ text: `${photos.length} injury photo(s) attached:` });
      for (const photo of photos) {
        // photo is base64 data URL
        const base64Match = photo.match(/^data:(image\/\w+);base64,(.+)$/);
        if (base64Match) {
          parts.push({
            inlineData: {
              mimeType: base64Match[1],
              data: base64Match[2]
            }
          });
        }
      }
    }

    if (pdfText) {
      parts.push({ text: `Medical history document attached (base64). Please note any relevant medical history.` });
      
      const pdfMatch = pdfText.match(/^data:(application\/pdf);base64,(.+)$/);
      if (pdfMatch) {
        parts.push({
          inlineData: {
            mimeType: pdfMatch[1],
            data: pdfMatch[2]
          }
        });
      } else {
        const fallbackMatch = pdfText.match(/^data:(\w+\/\w+);base64,(.+)$/);
        if (fallbackMatch) {
            parts.push({
              inlineData: {
                mimeType: fallbackMatch[1],
                data: fallbackMatch[2]
              }
            });
        }
      }
    }

    if (parts.length === 0) {
      return new Response(JSON.stringify({ error: "No input provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    parts.push({ text: "Based on all the above information, provide your structured triage assessment as JSON." });

    const requestBody = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [{
        role: "user",
        parts: parts
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      throw new Error("AI provider error");
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Parse JSON from response
    let jsonStr = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) jsonStr = jsonMatch[1];
    
    const triageResult = JSON.parse(jsonStr.trim());

    return new Response(JSON.stringify(triageResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Triage error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
