import clsx, { ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}
export const isDevMode = () => {
  return process.env.NODE_ENV === "development";
};
export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

export const isCanSubmit = (shema: any, data: any) => {
  return shema.safeParse({ ...data }).success;
};

export const isArabicChar = (char: string) => {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(char);
};

export const hanldeCustomErrorsZod = (
  errors: any[],
  callback: (key?: any) => void
) => {
  let customBackErrors = {};
  errors?.forEach((e: any) => {
    customBackErrors = {
      ...customBackErrors,
      [e.path[0]]: {
        message: e.message,
      },
    };
    return {
      [e.path[0]]: e.message,
    };
  });
  callback(customBackErrors);
};
