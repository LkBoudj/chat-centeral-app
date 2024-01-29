import prismaConfig from "@/lib/configs/prismaConfig";
import { Message } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatOpenAiModel } from "@/lib/langchain/library";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { Document } from "@langchain/core/documents";

export async function GET(req: NextRequest) {
  try {
    const messages = await prismaConfig.message.findMany();

    const hnaldeMessages = messages.map((message: Message) => {
      return message.fromMachin
        ? new Document({
            pageContent: `AiMessage:${message.content}`,
          })
        : new Document({
            pageContent: `HumenMessage:${message.content}`,
          });
    });

    const prompt = ChatPromptTemplate.fromTemplate(`
    
    Answer the following question based on the context provided if you find it, otherwise search outside and write the source , dont write The text does not provide information :
  

        <context>
         my name is hichen
         {context}
        </context>
     
     Question: {input}
    
    `);
    chatOpenAiModel.modelName = "gpt-4";
    const documentChain = await createStuffDocumentsChain({
      llm: chatOpenAiModel,
      prompt,
    });

    const result = await documentChain.invoke({
      input: "create login page with nextjs ",
      context: hnaldeMessages,
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
