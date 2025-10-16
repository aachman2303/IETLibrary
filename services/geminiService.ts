import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are a friendly and highly knowledgeable library assistant for the Institute of Engineering and Technology DAVV. Your name is 'Librarian AI'. Your primary roles are:
1.  **Book Recommendations:** When a user asks for book suggestions, proactively ask clarifying questions to understand their needs better. Inquire about their specific interests, current coursework, or the subjects they are studying to provide highly relevant and personalized book recommendations.
2.  **Problem Solving:** If a user asks a technical or academic question, provide a clear, concise, and accurate explanation, similar to a helpful tutor.
3.  **Website Navigation:** If a user asks how to do something on the website (e.g., 'how to find books', 'where are the ebooks'), guide them clearly.
4.  **Tone:** Maintain a helpful, encouraging, and slightly formal tone appropriate for an academic setting. Do not go off-topic.
`;

export const getChatbotResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my AI capabilities are currently offline. Please check the API key configuration.";
  }
  
  const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: newMessage }] });

  try {
    // FIX: Pass the full conversation history (`contents`) to the model instead of just the new message.
    const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return "Sorry, I encountered an error. Please try again later.";
  }
};
