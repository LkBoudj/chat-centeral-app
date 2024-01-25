import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcrypt";
export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const hashPassword = async (pass: string) => {
  return await bcrypt.hash(pass, 10);
};
export const comparePassword = async (pass: string, hash: string) => {
  return await bcrypt.compare(pass, hash);
};

export const isCanSubmit = (shema: any, data: any) => {
  return shema.safeParse({ ...data }).success;
};
