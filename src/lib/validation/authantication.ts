import { z } from "zod";
import prismaConfig from "../configs/prismaConfig";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(1, {
      message: "Password is required",
    }),
});
export const registerSchema = loginSchema.merge(
  z.object({
    fullName: z.string().trim().min(1, { message: "full Name is required" }),
    agree: z.any().refine((data) => data == "agree", {
      message: "The registration process cannot be completed without agree ",
      path: ["agree"],
    }),
  })
);

export const backRegisterSchema = registerSchema.merge(
  z.object({
    email: z
      .string()
      .email()
      .refine(
        async (email) => {
          const isExists = await prismaConfig.user.findFirst({
            where: { email },
          });
          console.log(isExists);
          if (isExists) return false;
          return true;
        },
        {
          message: "This account exists. Go to the login page",
        }
      ),
  })
);
