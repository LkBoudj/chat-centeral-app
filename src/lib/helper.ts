import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import axios from "axios";

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
        const fileName = "/media/images/media_" + Date.now() + ".jpg";
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

export const saveAudio = async () => {};
export const convertImageToBaseFromUrl = async (nameFile: string) => {
  const imageFile = path.join(process.cwd(), "public", nameFile);
  const openTheFile = fs.readFileSync(imageFile);
  const base64Image = openTheFile.toString("base64");
  return base64Image;
};

export const createAudioFile = async (nameFile: string, buffer: Buffer) => {
  const filePath = path.join(process.cwd(), "public", nameFile);
  const vioce = fs.writeFileSync(filePath, buffer);
  return nameFile;
};

export const uploadFiles = async (
  files: File,
  folder = "/media/images",
  fileName = "media"
) => {
  const blob = files as Blob;
  const bytes = await blob.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { size, type: t } = blob;
  const type = t.split("/")[1];
  const name = `${folder}/${fileName}_${Date.now()}.${type}`;
  const src = path.join(process.cwd(), "public", name);

  fs.writeFileSync(src, buffer);

  return {
    src: name,
    type,
  };
};

export const isFileExists = (floder: string, nameFile: string) => {
  const filePath = path.join(process.cwd(), "public", floder, nameFile);
  return fs.existsSync(filePath);
};

export const removeFile = (floder: string, nameFile: string) => {
  const filePath = path.join(process.cwd(), "public", floder, nameFile);
  return fs.unlinkSync(filePath);
};
export const removeFileIfEexits = (floder: string, nameFile: string) => {
  if (isFileExists(floder, nameFile)) {
    removeFile(floder, nameFile);
  }
};
