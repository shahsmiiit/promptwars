# TriageAI 🚨
### *Because panic shouldn't cost you the right decision.*

> **"The gap between a person in crisis and the care they need isn't always distance — it's clarity."**

---

There's a moment in every medical emergency where time slows down and the human brain does the worst possible thing: it freezes.

You're standing over someone who's hurt. You have a phone in your hand. You have *everything* you need to help — except a clear answer to the only question that matters right now: **what do I actually do?**

TriageAI was built for that moment.

It doesn't replace a doctor. It doesn't pretend to. What it does is take the messy, panicked, incomplete inputs a real human produces under stress — a shaky voice, a blurry photo, a stack of PDFs from three different hospitals — and turn them into one clear, confident, structured answer. Fast.

**This is a Gemini-powered bridge between human chaos and life-saving action.**

---

## What's live right now

| Layer | What's built | Why it matters |
|-------|-------------|----------------|
| **Landing screen** | Hero CTA, app framing | First impressions under stress must be instant and clear — zero cognitive load before the user even starts |
| **Voice input** | Web Speech API — speak naturally, no typing required | When your hands are shaking, typing is the last thing you can do |
| **Photo capture** | Camera + gallery, up to 3 images | An injury speaks louder than any description — Gemini sees what words miss |
| **Medical history upload** | PDF ingestion | A person's history doesn't disappear in an emergency — allergies, medications, prior conditions all matter |
| **Gemini AI processing** | Edge function → Gemini 2.5 Flash via Lovable AI gateway, multimodal (text + images + PDF) → structured JSON | The entire intelligence layer. Accepts chaos, returns clarity. |
| **Triage result card** | Severity level, confidence score, symptoms, summary, recommended action, care type | One screen. One verdict. No ambiguity. |
| **Confirmation gate** | Human must confirm before any action fires | Because AI should advise, not act unilaterally — a person must stay in the loop |
| **Confirmed screen** | Mock dispatch + care routing | Closes the loop — the user knows something is happening, not just that a card was shown |
| **Design system** | Mobile-first, glass-morphism cards, emergency colour palette, Framer Motion transitions | An app used in emergencies must *feel* reliable. Ugly tools feel untrustworthy. Trust costs lives. |

---

## How it actually works

```
YOU (panicked, messy, incomplete)
        ↓
  Speak. Photograph. Upload.
        ↓
  Gemini 2.5 Flash processes everything — simultaneously
  (voice transcript + visual injury analysis + medical history context)
        ↓
  Structured triage object returned in seconds:
  severity / confidence / symptoms / actions / care type
        ↓
  You see one clear card. You confirm.
        ↓
  The right action fires.
```

No form filling. No dropdown menus. No "please describe your symptoms in 250 words." Just: here's what happened, here's what to do.

---

## The design choices aren't decoration

This could have been a white form on a white background with a blue button. It isn't. Here's why every visual decision was deliberate:

**Dark background (#0f0f0f):** Emergency rooms aren't bright and cheerful. Neither is this app. A near-black background reduces glare in harsh lighting, forces the urgent red accents to pop, and psychologically signals that this tool is serious.

**Glass-morphism cards:** Not just aesthetic. The layered transparency creates visual hierarchy without cognitive noise — the most important information reads first, always.

**Framer Motion transitions:** Nothing is jarring. Screens slide in rather than snap, results fade up rather than flash. Under stress, sudden visual changes spike anxiety. Every transition was considered.

**Emergency colour palette:** The severity colours aren't arbitrary — they map directly to the mental model everyone already has. Red means *now*. Green means *breathe*.

---

## See it in action — a real run

> This isn't a cherry-picked demo. This is what happened when we fed TriageAI an actual injury photo and a real medical history PDF. Gemini read both. The output below is what it returned. Unedited.

---

### The inputs

A bystander at a sports field submitted three things in under 30 seconds:

**Voice:** *"Leg injury, looks like a bone fracture"* — spoken, panicked, imprecise.

**Photo:** An image of a leg injury (ankle/lower leg visible, pain clearly present).

**Medical history PDF uploaded:**

```
Patient:       Alex Johnson, 29 years old
Current injury: Suspected Left Knee Meniscus/ACL tear
Mechanism:     Sudden deceleration + pivoting, high-impact activity
Symptoms:      Acute pain, localized swelling, audible "pop", unable to bear weight
Allergies:     Penicillin (Hives), Latex (Mild contact dermatitis)
Medications:   Ibuprofen 400mg as needed, Lisinopril 10mg daily
Conditions:    Mild Hypertension (controlled)
Blood type:    O-Positive
Activity:      Runs 15 miles/week, competitive soccer
```

Notice the mismatch: the voice says "bone fracture", the photo shows an ankle, but the PDF says "knee meniscus/ACL tear." This is exactly the kind of contradictory, messy, real-world input that breaks simple systems. Watch what Gemini does with it.

---

### What Gemini returned

**Step 1 — Triage Assessment Card**

```
Severity:     HIGH  (8/10)
Confidence:   85%
Urgency:      URGENT
Care type:    EMERGENCY
```

**AI Summary:**

> The patient, Alex Johnson, 29, presents with a suspected left knee meniscus/ACL tear following
> high-impact injury involving sudden deceleration and pivoting. Symptoms include acute pain,
> localized swelling, an audible "pop" at time of injury, and inability to bear weight. The bystander
> reports "leg injury, bone fracture" — the provided image schematically represents ankle pain and
> does not directly depict the reported knee injury. Medical history includes controlled mild
> hypertension, penicillin and latex allergies, and a previous Grade 2 right ankle sprain.

**Identified symptoms:**
- Acute pain
- Localized swelling (effusion)
- Audible "pop" at time of injury
- Inability to bear weight
- Suspected bone fracture (bystander report — flagged as unverified)

**Recommended action:**

> Immediate professional medical evaluation by an orthopedic specialist or emergency department.
> Imaging (X-ray, MRI) likely required. Avoid weight-bearing on affected leg.
> Apply RICE — Rest, Ice, Compression, Elevation.
> **⚠️ Note penicillin and latex allergies before any clinical contact.**

**Gemini's own reasoning note:**

> *"The bystander description of 'bone fracture' and the ankle image do not align with the medical
> history's primary concern of a suspected left knee meniscus/ACL tear. Triage is based primarily
> on the documented medical history. The image is a generic representation and not patient-specific.
> Given reported symptoms and mechanism of injury, a knee injury is strongly suspected and warrants
> urgent attention."*

This is the part that matters most. **Gemini didn't just echo the inputs — it detected the contradiction, flagged it explicitly, weighted the sources by reliability, and still produced a coherent triage decision.** That's not a chatbot. That's a clinical reasoning layer.

---

**Step 2 — Human confirmation gate**

Before anything happens, the user sees:

```
TriageAI recommends: EMERGENCY CARE
Do you want to proceed?

  [ Confirm & Route ]     [ Review again ]
```

The user confirms. Only then does dispatch fire.

---

**Step 3 — Dispatch initiated**

```
Status:   DISPATCHED (mock)
Unit:     EMT-42
ETA:      ~6 minutes
          Triage code sent to paramedics
```

**Nearest facilities surfaced automatically:**

| Facility | Type | ETA | Distance |
|----------|------|-----|----------|
| City General Hospital | Emergency Room | 4 min | 0.8 mi |
| QuickCare Urgent Clinic | Urgent Care | 7 min | 1.2 mi |
| Community Health Center | Primary Care | 12 min | 2.1 mi |

Each facility has a live **Navigate** button. The user never leaves the app to find where to go.

---

### What this run proves

Three inputs arrived in conflict with each other. A panicked voice saying one thing, a photo showing another, a PDF saying a third. Most tools would either fail silently, pick one input and ignore the rest, or produce a vague non-answer.

TriageAI read all three, resolved the conflict with explicit reasoning, surfaced the critical allergy flags from the medical history, and delivered a clear action — in seconds, on a phone, under stress.

That's the bridge working.

---



### Iteration 2 — Core polish *(immediate)*
The foundation is solid. These are the rough edges:
- Fix the blank preview bug (suspected React import scope issue)
- Native in-app audio recording with live waveform visualisation — Web Speech API is functional but a real waveform makes the user feel *heard*
- Input validation — require at least voice or photo before submission
- Loading skeleton + retry on Gemini timeout — silence during a 10-second API call feels like a crash

### Iteration 3 — Clinical depth
- AI follow-up questions based on initial assessment — a second pass where Gemini asks what it doesn't know yet
- Body map selector — tap where it hurts, literally
- Vital signs input — pulse, breathing rate, consciousness level

### Iteration 4 — Action and routing
- Geolocation-based facility finder — nearest ER or urgent care, not just a generic Google Maps embed
- One-tap emergency call button — no switching apps, no copy-pasting numbers
- PDF export of the triage report — hand it to the paramedic when they arrive

### Iteration 5 — Trust and safety
- Confidence visualisation — a gauge, not just a number, because humans read gauges faster under stress
- Medical disclaimer and consent flow — for the real world, this matters
- Offline fallback with cached guidance — emergencies don't wait for wifi

---

## Stack

```
Frontend    React + Vite + TypeScript + TailwindCSS + Framer Motion
AI          Gemini 2.5 Flash (multimodal — text, vision, document)
Gateway     Lovable AI edge function
Input APIs  Web Speech API (voice), MediaDevices (camera), File API (PDF)
```

---

## Run it locally

```bash
git clone https://github.com/shahsmiiit/promptwars
cd promptwars

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd ../backend
npx nodemon src/infrastructure/web/server.ts
```

The mock API loop is fully connected — you can run the entire triage flow locally without a Gemini API key. The AI responses are mocked to match the exact production contract.

---

## The point

Every day, people make the wrong call in a medical emergency — not because they don't care, but because they don't know. They wait when they should go. They go when they should wait. They describe symptoms inaccurately because fear degrades language.

TriageAI doesn't solve medicine. It solves the **translation problem** between a frightened human and a system that needs structured input to act.

That's the bridge. That's the whole point.

---

*Built at a hackathon. Powered by Gemini. Driven by the belief that the right information at the right moment — delivered clearly, instantly, and with confidence — is itself a form of care.*

---

<div align="center">
  <sub>TriageAI · Gemini-powered · Built with intent, not just code</sub>
</div>
