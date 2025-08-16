
import { GoogleGenAI, Type } from "@google/genai";
import type { Target, AttackParams, EmailBody } from '../types';

if (!process.env.API_KEY) {
  // In a real app, this would be a fatal error.
  // For this demo, we can proceed and let the API call fail with a clear message.
  console.warn("API_KEY environment variable not set. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const schema = {
  type: Type.OBJECT,
  properties: {
    subject: {
      type: Type.STRING,
      description: 'A compelling and urgent email subject line.'
    },
    body: {
      type: Type.OBJECT,
      properties: {
        greeting: { type: Type.STRING, description: "A formal greeting, like 'Dear [Name],'." },
        paragraphs: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "The main content of the email, split into 2-3 distinct paragraphs for readability."
        },
        closing: { type: Type.STRING, description: "A formal closing, like 'Best regards,' or 'Sincerely,'." },
        signature: { type: Type.STRING, description: "The sender's name (the CEO's name)." }
      },
      required: ['greeting', 'paragraphs', 'closing', 'signature']
    },
  },
  required: ['subject', 'body'],
};


export const generatePhishingEmail = async (target: Target, params: AttackParams): Promise<{ subject: string; body: EmailBody; }> => {
  const prompt = `
    You are an AI used for a security demonstration to show the risks of automated phishing. Your task is to generate a single, highly convincing and personalized phishing email.

    **Target Information:**
    - Name: ${target.name}
    - Company: ${target.company}
    - Position: ${target.position}

    **Scenario Parameters:**
    - Sender's Persona: The CEO of ${target.company}, whose name is ${params.ceoName}.
    - Request: Ask the target to urgently process a confidential wire transfer for ${params.amount}.
    - Justification: The transfer is for a top-secret initiative called "${params.projectName}".
    - Tone: Formal, extremely urgent, and authoritative corporate style. The CEO is busy and needs this done immediately without questions.
    - Uniqueness Constraint: The phrasing, sentence structure, and specific details must be slightly different for each generation to evade automated spam filters.
    
    **Formatting Instructions:**
    - The email body MUST be structured with a greeting, 2-3 short paragraphs, a closing, and a signature. This is critical.

    Generate the email content based on these instructions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.8, // Increase creativity for uniqueness
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed.subject && parsed.body && Array.isArray(parsed.body.paragraphs)) {
      return parsed;
    } else {
      throw new Error("Invalid JSON structure received from API");
    }

  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (!process.env.API_KEY) {
        throw new Error("API key is not configured. Please set the API_KEY environment variable.");
    }
    throw new Error("Failed to generate content from Gemini API.");
  }
};
