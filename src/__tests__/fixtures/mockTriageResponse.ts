export const mockTriageResponse = {
  severity: "high",
  confidence: 0.85,
  symptoms_detected: ["acute pain", "localized swelling", "audible pop", "inability to bear weight"],
  relevant_history: ["Penicillin allergy", "Latex allergy", "Mild hypertension", "Lisinopril daily"],
  immediate_actions: [
    "Do not bear weight on affected leg",
    "Apply RICE — Rest, Ice, Compression, Elevation",
    "Avoid Penicillin-based antibiotics",
    "Alert clinical staff to Latex allergy before any examination"
  ],
  recommended_care: "ER",
  reasoning: "Suspected left knee meniscus/ACL tear with high mechanism of injury...",
  flags: ["allergy-risk", "drug-interaction"]
};
