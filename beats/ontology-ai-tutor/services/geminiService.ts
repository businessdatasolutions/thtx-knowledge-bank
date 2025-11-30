import { GoogleGenAI, Type } from "@google/genai";
import { AICritique, Option } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTutorFeedback = async (
  caseContext: string,
  stageTitle: string,
  selectedOption: Option
): Promise<AICritique> => {
  try {
    const prompt = `
      You are an expert Business Management Professor teaching the "Palantir Ontology" framework.
      The framework consists of three pillars:
      1. Data (The Nouns): Semantic real-world objects, not just tables.
      2. Logic (The Reasoning): Models, AI, and algorithms bound to the data.
      3. Action (The Verbs): Executing decisions back into operational systems (write-back).
      
      The student is working on a case study: "${caseContext}".
      
      They are at the stage: "${stageTitle}".
      They selected the option: "${selectedOption.label}" which is described as "${selectedOption.description}".
      This option is marked as ${selectedOption.isCorrect ? "CORRECT" : "INCORRECT"} in the system.

      Provide feedback to the student. 
      - If correct, explain WHY this fits the Ontology framework (e.g., how it enables real-time decision making or closes the loop).
      - If incorrect, kindly explain why it falls short (e.g., is it just static reporting? Does it lack actionability?).
      - Keep the tone professional, encouraging, and academic.
      - Return the response in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            score: { type: Type.INTEGER },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AICritique;

  } catch (error) {
    console.error("Error fetching tutor feedback:", error);
    // Fallback if AI fails
    return {
      feedback: selectedOption.isCorrect 
        ? "Great choice! This aligns perfectly with the decision-centric architecture." 
        : "Not quite. This choice might be too passive or disconnected from operational reality.",
      score: selectedOption.isCorrect ? 100 : 50,
      suggestions: ["Review the definitions of Data, Logic, and Action."]
    };
  }
};