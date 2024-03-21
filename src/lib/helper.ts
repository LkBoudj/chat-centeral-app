import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import axios from "axios";
import { promisify } from "util";

import { FileTypeNotAbodedError } from "./configs/custom_errors_thorw";

const writeFileAsync = promisify(fs.writeFile);

export const hashPassword = async (pass: string) => {
  return await bcrypt.hash(pass, 10);
};

export const comparePassword = async (pass: string, hash: string) => {
  return await bcrypt.compare(pass, hash);
};

export const saveImageFromURL = async (
  data: { src: string; type: string; revised_prompt?: string }[],
  callback: (
    result: { src: string; type: string; revised_prompt?: string } | null
  ) => void
) => {
  try {
    const filesData = await Promise.all(
      data.map(async (image) => {
        const res = await axios({
          method: "GET",
          url: image.src,
          responseType: "stream",
        });

        if (res.status !== 200) {
          console.error(`Failed to download image from ${image.src}`);
          return null;
        }

        const fileName = `/media/images/media_${Date.now()}.jpg`;
        const outputPath = path.join(process.cwd(), "public", fileName);
        res.data.pipe(fs.createWriteStream(outputPath));

        return {
          src: fileName,
          type: image.type,
          revised_prompt: image.revised_prompt,
        };
      })
    );

    for (const fileData of filesData) {
      if (fileData) {
        callback(fileData);
      }
    }

    return filesData;
  } catch (error) {
    console.error("Error while saving image from URL:", error);
    return null;
  }
};

export const convertImageToBaseFromUrl = async (nameFile: string) => {
  try {
    const imageFile = path.join(process.cwd(), "public", nameFile);
    const openTheFile = fs.readFileSync(imageFile);
    const base64Image = openTheFile.toString("base64");
    return base64Image;
  } catch (error) {
    console.error("Error while converting image to base64:", error);
    return null;
  }
};

export const createAudioFile = async (name: any, buffer: any) => {
  const dir = "media/audio";
  const extension = "mp3"; // Assuming audio files will be mp3 format

  const fileName = `${dir}/${name}.${extension}`;
  const src = getPublicFilePath(fileName);

  await writeFileAsync(src, Buffer.from(buffer));

  return {
    src: `/${fileName}`,
    type: `audio/${extension}`,
  };
};

export const uploadFileMedia = async (file: File, userId?: any) => {
  const { type } = file;
  const extension = type.split("/")[1];

  const allowedTypes = {
    video: ["mp4"],
    audio: ["mp3"],
    image: ["jpg", "jpeg", "png", "gif", "webp"],
    document: ["pdf", "gpg"],
  };

  let dir = "media";
  let typeMedia = "";

  for (const [mediaType, extensions] of Object.entries(allowedTypes)) {
    if (type.startsWith(mediaType)) {
      if (!extensions.includes(extension)) {
        throw new FileTypeNotAbodedError(
          `This ${mediaType} file type is not allowed`
        );
      }
      dir += `/${mediaType}s`;
      typeMedia = mediaType + "s";
    }
  }

  const name = `${dir}/media_${Date.now()}.${extension}`;
  const src = getPublicFilePath(name);

  await writeFileAsync(src, Buffer.from(await file.arrayBuffer()));

  return {
    userId,
    src: `/${name}`,
    type: `${typeMedia}/${extension}`,
  };
};

export const uploadMultiFileMedia = async (files: File[], userId?: any) => {
  const medias: any[] = [];

  for (const file of files) {
    const media = await uploadFileMedia(file, userId);
    medias.push(media);
  }

  return medias;
};

export const getPublicFilePath = (name?: string) => {
  return path.join(process.cwd(), "public", name ?? "");
};

export const isFileExists = (folder: string, nameFile: string) => {
  const filePath = path.join(process.cwd(), "public", folder, nameFile);
  return fs.existsSync(filePath);
};

export const removeFile = (folder: string, nameFile: string) => {
  const filePath = path.join(process.cwd(), "public", folder, nameFile);
  return fs.unlinkSync(filePath);
};

export const removeFileIfExists = (folder: string, nameFile: string) => {
  if (isFileExists(folder, nameFile)) {
    removeFile(folder, nameFile);
  }
};
