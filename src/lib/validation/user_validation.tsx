import { z } from "zod";
import { userController } from "../controller";

export const schemaUser = z.object({
  name: z.string().min(1, "the name is required"),
  email: z.string().email(),
  description: z.string().nullable().nullish(),
});

export const schemaCreateUser = schemaUser.merge(
  z.object({
    roles: z.enum(["user", "admin"]),
    image: z.string().nullable().nullish(),
    status: z.boolean().default(true),
    password: z.string().min(1, "the name is required"),
    messagesMax: z
      .string()
      .transform((data) => parseInt(data))
      .nullable()
      .nullish()
      .nullish(),
    stripeCustomerId: z.string().nullable().nullish(),
    stripeSubscriptionId: z.string().nullable().nullish(),
    stripePriceId: z.string().nullable().nullish(),
    SubscriptionExpirydate: z.date().nullable().nullish(),
  })
);

export const schemaEditUser = schemaUser.merge(
  z.object({
    id: z.string(),
    roles: z.enum(["user", "admin"]),
    image: z.string().nullable().nullish(),
    status: z.boolean().default(true),
    password: z.string().min(1, "the name is required"),
    messagesMax: z
      .string()
      .transform((data) => parseInt(data))
      .nullable()
      .nullish()
      .nullish(),
    stripeCustomerId: z.string().nullable().nullish(),
    stripeSubscriptionId: z.string().nullable().nullish(),
    stripePriceId: z.string().nullable().nullish(),
    SubscriptionExpirydate: z.date().nullable().nullish(),
  })
);
export const schemaCreateUserBack = schemaCreateUser.merge(
  z.object({
    email: z
      .string()
      .email()
      .refine(
        async (data) => {
          const isExist = await userController.isExits({ email: data });

          return !isExist;
        },
        { message: "the email is exixts" }
      ),
    messagesMax: z.number().nullable().nullish().nullish(),
  })
);

export type schemaCreateUserInputs = z.infer<typeof schemaCreateUser>;
