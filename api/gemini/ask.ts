import type { Request, Response } from 'express';
import { askGeminiCoach } from '../../server/geminiService.js';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
    return;
  }

  try {
    const { question, context } = req.body || {};
    if (!question || typeof question !== 'string') {
      res.status(400).json({ success: false, error: 'Question parameter is required.' });
      return;
    }
    const result = await askGeminiCoach(question, context || {});
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Vercel Serverless Error in /api/gemini/ask:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to answer question",
    });
  }
}
