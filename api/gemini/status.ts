import type { Request, Response } from 'express';

export default function handler(_req: Request, res: Response) {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  res.status(200).json({
    configured: hasKey,
    model: "gemini-3.7-flash",
    message: hasKey 
      ? "Gemini API key is configured and active in Vercel environment."
      : "GEMINI_API_KEY is not set in environment variables.",
  });
}
