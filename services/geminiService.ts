
import { GoogleGenAI, Type } from "@google/genai";
import type { QAResponse } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set. Please add it to your environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const qaModel = "gemini-2.5-flash";
const stickerModel = "imagen-4.0-generate-001";

const getSystemInstruction = (language: 'ko' | 'en') => {
  if (language === 'ko') {
    return "당신은 6-8세 어린이를 위한 친절하고 재미있는 동물 전문가입니다. 모든 답변은 매우 쉬운 단어와 짧은 문장(최대 3-5문장)으로 구성해야 합니다. 긍정적이고 격려하는 어조를 사용하세요. 과학적 사실을 왜곡하지 말고, 모르는 것은 모른다고 솔직하게 말하세요. 절대로 위험하거나, 무섭거나, 폭력적이거나, 부적절한 내용은 언급하지 마세요.";
  }
  return "You are a friendly and fun animal expert for children aged 6-8. All your answers must be in very simple words and short sentences (3-5 sentences max). Use a positive and encouraging tone. Do not distort scientific facts; if you don't know something, say so honestly. Absolutely never mention anything dangerous, scary, violent, or inappropriate.";
};

export async function getKidAnswer(question: string, language: 'ko' | 'en'): Promise<QAResponse> {
  try {
    const response = await ai.models.generateContent({
      model: qaModel,
      contents: question,
      config: {
        systemInstruction: getSystemInstruction(language),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "A short, simple answer to the user's question, suitable for a 6-8 year old child."
            },
            inferredAnimal: {
              type: Type.STRING,
              description: `The main animal mentioned in the user's question, in ${language}. If no animal is mentioned, this should be null.`
            }
          },
          required: ["answer", "inferredAnimal"]
        }
      }
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    // Sometimes the model returns "null" as a string instead of actual null.
    if (parsedResponse.inferredAnimal && parsedResponse.inferredAnimal.toLowerCase() === 'null') {
      parsedResponse.inferredAnimal = null;
    }

    return parsedResponse as QAResponse;

  } catch (error) {
    console.error('Error fetching kid answer:', error);
    throw new Error('Failed to get an answer from the AI.');
  }
}

export async function generateSticker(animal: string): Promise<string> {
  try {
    const prompt = `${animal}, cute cartoon sticker, centered, thick white outline, clean light solid background like beige or light blue, high contrast, square composition, kid-friendly, no text, no watermark, vibrant colors`;

    const response = await ai.models.generateImages({
      model: stickerModel,
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      throw new Error('No image was generated.');
    }
  } catch (error) {
    console.error('Error generating sticker:', error);
    throw new Error('Failed to generate sticker.');
  }
}
