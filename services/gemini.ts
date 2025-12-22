
import { GoogleGenAI } from "@google/genai";

// Standard implementation for the app's AI features
export const getETFInsights = async (etfName: string, ticker: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an elite financial analyst. Summarize the historical significance and future outlook of ${etfName} (${ticker}) in 25 words or less.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Intelligence currently unavailable.";
  }
};
