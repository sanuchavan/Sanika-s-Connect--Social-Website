
import { GoogleGenAI } from "@google/genai";
import { GenerateContentResponse } from "@google/genai";

// Ensure the API key is handled by the environment.
// In a real build process, process.env.API_KEY would be replaced.
// For this playground, we'll use a placeholder.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || " " });

/**
 * Generates a creative caption for an image.
 * @param base64Data The base64 encoded image data.
 * @param mimeType The MIME type of the image.
 * @returns A promise that resolves to the generated caption string.
 */
export const generateCaption = async (base64Data: string, mimeType: string): Promise<string> => {
    if (!apiKey || apiKey === " ") {
        return Promise.resolve("AI functionality is disabled. This is a sample caption!");
    }
    
    try {
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: mimeType,
            },
        };

        const textPart = {
            text: "Write a short, engaging, and cheerful social media caption for this image. Include 2-3 relevant emojis. Do not use hashtags.",
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        const text = response.text;
        if (text) {
            return text.trim();
        } else {
             throw new Error("No text returned from Gemini API");
        }

    } catch (error) {
        console.error("Error generating caption with Gemini:", error);
        throw new Error("Failed to generate caption from AI.");
    }
};
