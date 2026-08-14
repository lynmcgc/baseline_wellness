import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export interface BiometricContextPayload {
  userName?: string;
  goal?: string;
  readinessScore?: number;
  devices?: string[];
  hrvMs?: number;
  hrvBaselineDelta?: string;
  restingHr?: number;
  sleepDuration?: string;
  deepSleepPercent?: number;
  remSleepPercent?: number;
  stressScore?: number;
  customQuestion?: string;
}

export async function generateBiometricSynthesis(context: BiometricContextPayload): Promise<{
  source: 'gemini' | 'fallback';
  headline: string;
  summary: string;
  daytimeGuidance: string;
  autonomicReserve: string;
  eveningProtocol: string;
  correlations: string[];
}> {
  const ai = getGeminiClient();

  if (!ai) {
    // Graceful fallback when GEMINI_API_KEY environment variable is not configured yet
    return {
      source: 'fallback',
      headline: 'Autonomic Balance in Optimal Zone',
      summary: `Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep window. Overnight HRV (${context.hrvMs || 68} ms) is elevated ${context.hrvBaselineDelta || '+15.2%'} above baseline with a steady resting heart rate of ${context.restingHr || 51} bpm.`,
      daytimeGuidance: 'Physiologically primed for high-demand cognitive tasks or Zone 3-4 cardiovascular endurance sessions.',
      autonomicReserve: 'Sympathetic tone remained low overnight, indicating high physiological reserve and minimal accumulated fatigue.',
      eveningProtocol: 'Prioritize consistent wind-down timing and reduce screen exposure 45 minutes before sleep to sustain high nocturnal HRV.',
      correlations: [
        'Overnight HRV rMSSD is positively correlated with deep sleep percentage over the last 7 days.',
        'Low resting heart rate indicates cardiovascular restoration and minimal systemic inflammation.'
      ],
    };
  }

  const prompt = `You are Baseline Wellness's expert non-diagnostic biometric synthesis engine.
Synthesize the user's multi-wearable biometric data into an empowering, scientifically sound, plain-language morning wellness briefing.

USER BIOMETRIC CONTEXT:
- Name: ${context.userName || 'Member'}
- Primary Wellness Goal: ${context.goal || 'optimal_recovery'}
- Daily Readiness Score: ${context.readinessScore || 88} / 100
- Connected Wearable Hardware: ${(context.devices || ['Garmin Connect', 'Oura Ring']).join(', ')}
- Overnight HRV (rMSSD): ${context.hrvMs || 68} ms (${context.hrvBaselineDelta || '+15.2% vs baseline'})
- Resting Heart Rate: ${context.restingHr || 51} bpm
- Sleep Duration: ${context.sleepDuration || '7h 48m'}
- Deep & REM Sleep Proportion: ${context.deepSleepPercent || 18}% Deep, ${context.remSleepPercent || 24}% REM
- Stress Load Index: ${context.stressScore || 32} / 100

MANDATORY GUIDELINES:
1. Provide plain-language translation: explain what these physiological numbers mean for the user's day without confusing jargon.
2. Maintain strict non-diagnostic, informational wellness tone (no medical claims, disease diagnoses, or alarming warnings).
3. Align directly with their goal: ${context.goal}.
4. Return pure JSON matching this exact structure:
{
  "headline": "Short 4-7 word punchy headline of their physiological state",
  "summary": "2-3 sentences clearly explaining their autonomic recovery and sleep quality in plain language",
  "daytimeGuidance": "1-2 sentences on optimal physical or cognitive exertion for today",
  "autonomicReserve": "1-2 sentences on nervous system balance (parasympathetic vs sympathetic)",
  "eveningProtocol": "1 sentence actionable recommendation for tonight's wind-down routine",
  "correlations": ["Insightful trend observation 1", "Insightful trend observation 2"]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    const parsed = JSON.parse(text.trim());
    return {
      source: 'gemini',
      headline: parsed.headline || 'Optimal Parasympathetic Restoration',
      summary: parsed.summary || 'Your biometrics reflect deep physiological recovery overnight.',
      daytimeGuidance: parsed.daytimeGuidance || 'Primed for moderate to high physical and cognitive exertion.',
      autonomicReserve: parsed.autonomicReserve || 'High parasympathetic tone indicates resilience against stress.',
      eveningProtocol: parsed.eveningProtocol || 'Maintain consistent wind-down timing to protect tonight’s sleep architecture.',
      correlations: Array.isArray(parsed.correlations) ? parsed.correlations : [
        'HRV recovery aligns with high deep-sleep restoration.',
        'Resting heart rate demonstrates stable cardiovascular baseline.'
      ],
    };
  } catch (error) {
    console.error("Error invoking Gemini API in generateBiometricSynthesis:", error);
    return {
      source: 'fallback',
      headline: 'Autonomic Balance in Optimal Zone',
      summary: `Your autonomic nervous system demonstrated robust parasympathetic recovery throughout your sleep window. Overnight HRV (${context.hrvMs || 68} ms) is elevated ${context.hrvBaselineDelta || '+15.2%'} above baseline with a resting heart rate of ${context.restingHr || 51} bpm.`,
      daytimeGuidance: 'Physiologically primed for high-demand cognitive tasks or Zone 3-4 cardiovascular endurance sessions.',
      autonomicReserve: 'Sympathetic tone remained low overnight, indicating high physiological reserve and minimal accumulated fatigue.',
      eveningProtocol: 'Prioritize consistent wind-down timing and reduce screen exposure 45 minutes before sleep to sustain high nocturnal HRV.',
      correlations: [
        'Overnight HRV rMSSD is positively correlated with deep sleep percentage over the last 7 days.',
        'Low resting heart rate indicates cardiovascular restoration and minimal systemic inflammation.'
      ],
    };
  }
}

export async function askGeminiCoach(question: string, context: BiometricContextPayload): Promise<{
  source: 'gemini' | 'fallback';
  answer: string;
  actionItem?: string;
}> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      source: 'fallback',
      answer: `Based on your recent biometric baseline (Readiness 88/100, HRV 68ms, RHR 51 bpm), your autonomic nervous system is in a well-recovered state. For questions regarding "${question}", focusing on consistent sleep schedule, proper hydration, and zone 2 aerobic exercise will support sustained parasympathetic tone.`,
      actionItem: 'Check your daily readiness score and maintain standard evening sleep hygiene protocols.'
    };
  }

  const prompt = `You are Baseline Wellness's AI Physiological Coach.
A user is asking a question about their wearable biometric data, sleep, HRV, recovery, or lifestyle optimization.

USER BIOMETRIC CONTEXT:
- Readiness: ${context.readinessScore || 88} / 100
- Overnight HRV: ${context.hrvMs || 68} ms
- Resting HR: ${context.restingHr || 51} bpm
- Sleep Duration: ${context.sleepDuration || '7h 48m'}
- Goal: ${context.goal || 'longevity'}

USER QUESTION: "${question}"

GUIDELINES:
- Provide an evidence-informed, plain-language, encouraging explanation based on physiological science (autonomic nervous system, circadian rhythm, HRV rMSSD, restorative sleep).
- Emphasize that this is informational wellness guidance, not medical advice.
- Keep response concise, friendly, and directly actionable (2-4 paragraphs max).
- Return pure JSON:
{
  "answer": "Clear, plain-language explanation addressing their question",
  "actionItem": "1 practical actionable takeaway for today or tonight"
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    const parsed = JSON.parse(text.trim());
    return {
      source: 'gemini',
      answer: parsed.answer || 'Your biometrics indicate strong physiological recovery and autonomic balance.',
      actionItem: parsed.actionItem || 'Maintain consistent hydration and sleep schedule.'
    };
  } catch (error) {
    console.error("Error asking Gemini Coach:", error);
    return {
      source: 'fallback',
      answer: `Based on your physiological profile (HRV ${context.hrvMs || 68}ms, Readiness ${context.readinessScore || 88}/100), your system is well-equipped to handle today's demands. Remember to balance physical exertion with active recovery practices.`,
      actionItem: 'Keep an eye on resting heart rate trends over the upcoming week.'
    };
  }
}

export async function recommendAreaActivities(
  locationQuery: string,
  userPreferences?: {
    goal?: string;
    readinessScore?: number;
    weatherSummary?: string;
    activityType?: string;
  }
): Promise<{
  source: 'gemini' | 'fallback';
  location: string;
  weatherAdvice: string;
  recommendations: Array<{
    title: string;
    type: string;
    spotName: string;
    addressOrArea: string;
    suitabilityReason: string;
    duration: string;
    intensity: string;
    bestTimeOfDay: string;
  }>;
}> {
  const ai = getGeminiClient();

  if (!ai) {
    return {
      source: 'fallback',
      location: locationQuery || 'San Francisco, CA',
      weatherAdvice: 'Clear & mild conditions (64°F) — ideal for outdoor aerobic training and coastal strolls.',
      recommendations: [
        {
          title: 'Morning Coastal Zone 2 Stride',
          type: 'Aerobic Recovery',
          spotName: 'Presidio Coastal Bluffs',
          addressOrArea: 'Presidio Coastal Trailhead, San Francisco',
          suitabilityReason: 'Optimal crushed gravel terrain allows maintaining heart rate in strict aerobic Zone 2 while breathing fresh maritime air.',
          duration: '45 minutes',
          intensity: 'Moderate Aerobic',
          bestTimeOfDay: '8:00 AM – 10:30 AM',
        },
        {
          title: 'Autonomic Contrast Reset (Sauna + Plunge)',
          type: 'Cold Plunge & Sauna',
          spotName: 'Sanctuary Contrast Lounge',
          addressOrArea: '450 Hayes Street, San Francisco',
          suitabilityReason: 'Cold immersion (48°F) activates parasympathetic rebound and norepinephrine release to accelerate muscle repair.',
          duration: '50 minutes',
          intensity: 'Restorative',
          bestTimeOfDay: '3:30 PM – 5:30 PM',
        },
        {
          title: 'Forest Bathing & NSDR Session',
          type: 'Nervous System Recovery',
          spotName: 'Golden Gate Park Conservatory Meadow',
          addressOrArea: 'Conservatory Valley, Golden Gate Park',
          suitabilityReason: 'Shaded, acoustic tranquility reduces sympathetic tone and lowers resting cortisol.',
          duration: '30 minutes',
          intensity: 'Gentle Recovery',
          bestTimeOfDay: '1:00 PM – 2:30 PM',
        },
      ],
    };
  }

  const prompt = `You are Baseline Wellness's expert local activity and recovery recommender.
Recommend 3-4 specific local activities, parks, trails, contrast therapy/cold plunges, lap pools, or recovery spots for the following area: "${locationQuery}".

CONTEXT:
- Readiness score: ${userPreferences?.readinessScore || 88}/100
- Goal: ${userPreferences?.goal || 'optimal_recovery'}
- Weather: ${userPreferences?.weatherSummary || 'Mild and clear'}
- Preferred type: ${userPreferences?.activityType || 'all wellness & recovery'}

GUIDELINES:
- Name real, authentic trails, scenic viewpoints, cold plunge studios, public parks, or lap pools in or around "${locationQuery}".
- Connect each recommendation to physiology (e.g. Zone 2 cardio, autonomic tone, parasympathetic recovery, circadian light exposure).
- Return pure JSON matching this exact format:
{
  "location": "${locationQuery}",
  "weatherAdvice": "1 sentence on how current weather influences today's activity planning",
  "recommendations": [
    {
      "title": "Actionable activity name",
      "type": "Category (e.g. Cold Plunge & Sauna, Scenic Trail, Breathwork Park)",
      "spotName": "Specific landmark, park, or studio name",
      "addressOrArea": "Neighborhood or specific street/park area in ${locationQuery}",
      "suitabilityReason": "Why this aligns with physiological recovery and biometrics",
      "duration": "e.g. 40 minutes",
      "intensity": "Gentle Recovery / Moderate Aerobic / High Intensity / Restorative",
      "bestTimeOfDay": "e.g. 8:30 AM – 10:00 AM"
    }
  ]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    const parsed = JSON.parse(text.trim());

    return {
      source: 'gemini',
      location: parsed.location || locationQuery,
      weatherAdvice: parsed.weatherAdvice || 'Great conditions for balanced physical exertion and active recovery.',
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    };
  } catch (error) {
    console.error("Error in recommendAreaActivities:", error);
    return {
      source: 'fallback',
      location: locationQuery,
      weatherAdvice: 'Favorable conditions for circadian light exposure and Zone 2 outdoor exercise.',
      recommendations: [
        {
          title: `Scenic Outdoor Recovery Walk in ${locationQuery}`,
          type: 'Aerobic Walk',
          spotName: `Central Greenway / Waterfront Trail`,
          addressOrArea: locationQuery,
          suitabilityReason: 'Natural terrain and natural daylight promote circadian rhythm synchronization.',
          duration: '35 minutes',
          intensity: 'Gentle Recovery',
          bestTimeOfDay: 'Morning or Sunset',
        }
      ],
    };
  }
}

