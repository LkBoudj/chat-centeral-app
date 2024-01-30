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
      logo: "/technologies/gpt4.jpg",
    });

    return NextResponse.json("ok");
  } catch (e: any) {
    return NextResponse.json(e);
  }
}
