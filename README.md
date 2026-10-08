# SafeUganda — Child Online-Safety & Cyberbullying Prevention Platform

> **Vision:** "Safer Digital Spaces for Every Child in Uganda."  
> **Safeguarding Standard:** Aligned with Section 3 of Uganda’s *Data Protection and Privacy Act (2019)* and the *Children Act (Cap 59)*.

---

## 🛡️ Overview

**SafeUganda** is a production-quality, responsive web platform designed to protect Ugandan children from:
* Cyberbullying and peer exclusion
* Coercive threats & mobile money extortion
* Grooming and inappropriate adult contact
* Inappropriate and explicit media exposure
* Suspicious phishing links and scams
* Unsafe sharing of private personal information

The platform is designed for **children, parents/guardians, teachers, schools, counsellors, and national child-protection stakeholders** across Uganda.

---

## 🚀 Quick Start (Run Locally)

SafeUganda is built with **React, TypeScript, Vite, Tailwind CSS, and Lucide React**.

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

---

## 🏛️ Application Architecture

### 1. Public Portal
* `/` — High-impact landing page featuring a cybersecurity hero illustration, "Digital Safety Score" preview, real-time "Check a Message" scanner, and stakeholder pathways.
* `/about` — Mission, vision, Ugandan legal compliance (DPPA 2019, Computer Misuse 2022, Children Act Cap 59).
* `/how-it-works` — 4-pillar safeguarding model (Recognize, Protect, Learn, Escalate) with algorithmic humility.
* `/resources` — Downloadable safety toolkits for children, families, educators, and counsellors.
* `/report` — 5-step confidential incident reporting wizard with cryptographic integrity proof.
* `/emergency-help` — Dedicated "I Need Help Now" hub with verified Ugandan helplines (**Sauti 116**).
* `/login` & `/register` — Authentication portal with instant 1-click persona demo accounts.

### 2. Stakeholder Dashboards
* **Child Dashboard** (`/dashboard/child`):
  * "Hi Alex 👋" welcoming header
  * Digital Safety Score (82% Good Safety)
  * "I Need Help" quick emergency button
  * Check a Message tool
  * Interactive scenario quizzes with +10 Safety Points gamification
  * My Trusted People contact manager
  * Daily rotating safety tips
* **Parent / Guardian Dashboard** (`/dashboard/parent`):
  * Family Safety Centre with trust-based supervision
  * Safety alerts timeline
  * "Start a Conversation" non-invasive discussion prompts
  * Child learning progress tracker
* **School / Teacher Dashboard** (`/dashboard/school`):
  * Active student metrics and incident category breakdown
  * Monthly safety trends
  * Anonymized incident queue protecting student identity
* **Administrator Safeguarding Dashboard** (`/dashboard/admin`):
  * Safeguarding Operations Centre
  * Real-time incident desk with severity filters (Critical, High, Medium, Low)
  * Detailed case inspection (`INC-UG-2026-00124`) with timeline, sealed evidence, and formal escalation to Sauti 116.

---

## 🔒 Child-Safe & Privacy Principles
1. **Never Shame a Child:** Encounters with harmful material are treated supportively ("You did nothing wrong. Let's help you stay safe.").
2. **Zero Covert Surveillance:** SafeUganda rejects invasive spyware; it empowers children and fosters open dialogue with guardians.
3. **Zero Graphic Content in UI:** Abstract warnings and blurred placeholders are used for media safety education.
4. **Uganda Emergency Integration:** Verified contact pathways for the National Child Helpline (Sauti 116 toll-free) and Uganda Police Child & Family Protection Unit (CFPU).

---

## 📜 License
Licensed under the Apache-2.0 License.
