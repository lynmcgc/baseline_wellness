# Master Prompt: Wearable-Data Wellness Platform Website

> Use this prompt with an AI website builder (React + TypeScript target) to generate the landing page + gated member dashboard for a subscription wellness platform built on consumer wearable data.

---

## R — Role

You are a senior product designer and frontend engineer specializing in **health-tech and wellness SaaS platforms**. You have deep experience building trustworthy, science-forward digital health products (think Whoop, Oura, Levels) that translate raw biometric data into clear, motivating, non-clinical guidance. You default to clean information hierarchy, restrained color use, and copy that earns trust through precision rather than hype.

---

## G — Goal

Design and build a two-part website for a new **subscription wellness platform** that ingests data from consumer wearables (Garmin, Fitbit, Oura, Apple, etc.) and turns it into a **unified, plain-language wellness dashboard**, layered with **community accountability and classes**, to help users optimize personal wellness metrics and stay motivated long-term.

The site must accomplish two jobs at once:
1. **Convert** health-conscious visitors into signups via a public marketing/landing experience.
2. **Retain and motivate** signed-up members via a gated dashboard experience that is flexible enough to spotlight whatever metrics matter most to that individual user.

---

## O — Output

Produce a **React + TypeScript** website with two distinct experiences:

### 1. Public Landing Page
- Hero section: calm, science-backed value proposition (unified dashboard translating biometrics into plain-language insight)
- Cross-brand wearable compatibility messaging (not locked to one device)
- Value pillars: personalized recovery/HRV/sleep/stress guidance, community-driven accountability layered on science
- Social proof / trust section (data privacy, scientific validation, "insight not medical advice" framing)
- Community & classes teaser (supporting role — not the lead visual)
- Single primary CTA: **"Get Started"** — routes into onboarding/signup flow
- **No pricing or tier details visible pre-signup** — tiers are revealed inside the Get Started flow, not on the landing page
- Footer: compliance/privacy links, disclaimers

### 2. Gated Member Dashboard (post-login)
- **Configurable metric focus**: dashboard architecture must support a user-selected or goal-driven set of hero metrics (e.g., a user optimizing for training load sees HRV + recovery + activity; a user optimizing for stress sees stress + sleep) rather than a fixed fixed metric set
- Modular card/widget system so metrics can be added, reordered, or hidden per user goal
- Plain-language insight layer above raw numbers (translate biometrics → "what this means for you today")
- Community module: challenges, groups, classes — present as a **secondary sidebar/tab**, not competing with the primary dashboard view
- Freemium-to-premium upsell touchpoints embedded contextually (e.g., locked advanced insight, "unlock deeper analysis") rather than a pricing page

### Deliverable format
- Component-based React/TypeScript structure (logical component breakdown: `LandingPage`, `Hero`, `TrustSection`, `CommunityTeaser`, `DashboardShell`, `MetricCard`, `MetricSelector`, `CommunityPanel`, `UpsellPrompt`, etc.)
- Include a short design-tokens note (color, type, spacing) matching the tone below
- Include placeholder/mock data structures for wearable metrics (no real API integration required at this stage)

---

## G — Guardrails

**Compliance (strict — non-negotiable):**
- **No medical claims.** Never use diagnostic, treatment, or clinical-outcome language.
- **No diagnosis language.** Frame all outputs as "insight," "pattern," or "score" — never "condition," "diagnosis," or "risk of disease."
- All copy must be **GDPR/HIPAA-safe**: no implication that the platform stores or interprets data as protected health information; include a visible "this is not medical advice" disclaimer near any biometric insight.
- Any wellness "score" must be explicitly labeled as informational, not clinical (per BMC Value Proposition constraint: *"Wellness score as insight, not medical advice — legal constraint on claims"*).

**Design & scope constraints:**
- Dashboard is the **primary product surface**; community/classes support it but never visually dominate.
- Metric selection must be **flexible/configurable**, not a fixed hardcoded set — build for extensibility across HRV, sleep, stress, activity, recovery, and future metric types.
- **No pricing/tier information on the public landing page.** Tier reveal happens only inside the Get Started/onboarding flow.
- Primary design voice: **calm, science-backed, clinically trustworthy** — avoid hype-driven fitness-app tropes (no aggressive gamification, no medical-alarm red states without context).
- Do not lock the experience to a single wearable brand — messaging and data models must stay brand-agnostic (per Key Activities: cross-brand compatibility).
- Respect resource realism from the BMC: no claims of features not yet built (e.g., B2B corporate wellness, data insights licensing) — these are future revenue streams, not current-site features.

---

## C — Context

**Business model summary (from Business Model Canvas):**

- **Value Propositions:** Unified wellness dashboard translating biometrics into plain-language insight; cross-brand wearable compatibility; community-driven accountability layered on science; personalized recovery/HRV/sleep/stress recommendations; wellness score positioned as insight, not medical advice.
- **Primary Customer Segment (this build):** Health-conscious adults, 25–45, who own wearables. (Secondary/future segments: athletes/high performers, people navigating burnout/stress, biohacking enthusiasts, corporate wellness participants — not the design lead for this phase.)
- **Customer Relationships:** Personalized AI-driven coaching, community engagement (challenges/groups), freemium-to-premium conversion funnel, educational trust-building content.
- **Channels:** App Store/Google Play, wearable marketplaces (Garmin Connect IQ, Fitbit gallery), wellness/biohacking influencer marketing, organic community referrals.
- **Key Partners:** Wearable makers (Garmin, Fitbit, Oura, Apple), sports scientists/sleep researchers, recovery/wellness affiliate brands, legal/compliance advisors, research institutions, gyms/wellness studios.
- **Key Resources:** Wearable API integrations, proprietary wellness scoring algorithms, data science/ML talent, biometric data infrastructure (cloud/security), scientific advisory board (not yet established — flag as in-progress).
- **Revenue Streams:** Tiered subscriptions (free/premium/elite), family/group plans, affiliate revenue, B2B corporate wellness (future), data insights licensing (future, anonymized/compliant only).
- **Known constraints/risks flagged on BMC:** Third-party API rate limits and data granularity restrict what the dashboard can show; GDPR/HIPAA compliance overhead; scientific advisory credibility gap (not yet established); high customer acquisition cost vs. entrenched competitors; legal constraint that wellness scores must read as insight, not medical advice.

**Decisions locked for this build (from stakeholder input):**
- Site = landing page **and** gated dashboard (not one or the other)
- Dashboard metrics = flexible/configurable per user goal, not fixed
- Lead persona = health-conscious adults 25–45
- Dashboard is the visual star; community/classes are supporting
- Compliance posture = strict, no medical claims anywhere
- Pricing stays hidden until the Get Started flow
- Tone = calm, science-backed, clinically trustworthy
- Target stack = React + TypeScript
