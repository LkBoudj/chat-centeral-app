import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import axios from "axios";
import mediaController from "./controller/media_controller";
import { Media } from "@prisma/client";
export const hashPassword = async (pass: string) => {
  return await bcrypt.hash(pass, 10);
};
export const comparePassword = async (pass: string, hash: string) => {
  return await bcrypt.compare(pass, hash);
};

export const saveImageFromURL = async (
  data: any[],
  callback: ({
    src,
    revised_prompt,
    type,
  }: {
    src: string;
    revised_prompt?: string;
    type: string;
  }) => any
) => {
  const filesData = await Promise.all(
    data.map(async (image) => {
      const res = await axios({
        method: "GET",
        url: image.src,
        responseType: "stream",
      });
      if (res.status) {
        const fileName = "/media/media_" + Date.now() + ".jpg";
        const outputPath = path.join(process.cwd(), "public", fileName);
        res.data.pipe(fs.createWriteStream(outputPath));

        return callback({
          src: fileName,
          type: image.type,
          revised_prompt: image.revised_prompt,
        });
      }
      return null;
    })
  );

  return filesData;
};
