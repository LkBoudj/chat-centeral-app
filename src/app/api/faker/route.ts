import technologyController from "@/lib/controller/technology_controller";
import axios from "axios";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    await technologyController.create({
      name: "Gpt 4",
      logo: "/technologies/gpt4.jpg",
      models: "gpt-4-0125-preview#gpt-4",
    });
    await technologyController.create({
      name: "Gpt 3",
      logo: "/technologies/gpt3.jpg",
    });

    await technologyController.create({
      name: "Dall-e",
      logo: "/technologies/dall.jpg",
      models: "dall-e-1#dall-e-3",
    });
    await technologyController.create({
      name: "Text To Speach",
      refTech: "tts",
      logo: "/technologies/tts.jpg",
      models: "tts-1#tts-1-hd",
    });

    await technologyController.create({
      name: "Speacg To Text",
      refTech: "stt",
      logo: "/technologies/tts.jpg",
      models: "whisper-1",
    });

    return NextResponse.json("ok");
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
