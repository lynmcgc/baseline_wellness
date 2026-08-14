import type { Request, Response } from 'express';
import { generateBiometricSynthesis } from '../../server/geminiService.js';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
    return;
  }

  try {
    const payload = req.body || {};
    const synthesis = await generateBiometricSynthesis(payload);
    res.status(200).json({ success: true, data: synthesis });
  } catch (error) {
    console.error("Vercel Serverless Error in /api/gemini/synthesis:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate synthesis",
    });
  }
}
