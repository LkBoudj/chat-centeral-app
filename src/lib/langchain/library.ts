import { ChatOpenAI } from "@langchain/openai";

export const chatOpenAiModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
