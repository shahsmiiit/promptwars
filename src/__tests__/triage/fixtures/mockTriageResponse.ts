export const mockTriageResponse = {
  severity: "high",
  score: 8,
  confidence: 0.85,
  urgency: "urgent",
  symptoms_detected: ["acute pain", "localized swelling", "audible pop", "inability to bear weight"],
  relevant_history: ["Penicillin allergy (Hives)", "Latex allergy (contact dermatitis)", "Mild hypertension — controlled", "Lisinopril 10mg daily"],
  immediate_actions: [
    "Do not bear weight on affected leg",
    "Apply RICE — Rest, Ice, Compression, Elevation",
    "Alert clinical staff to Penicillin and Latex allergies",
    "Do not administer NSAIDs without checking Lisinopril interaction"
  ],
  recommended_care: "ER",
  care_type: "EMERGENCY",
  reasoning: "Suspected left knee meniscus/ACL tear with high mechanism of injury...",
  flags: ["allergy-risk", "drug-interaction"]
};
