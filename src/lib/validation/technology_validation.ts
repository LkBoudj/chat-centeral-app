import { z } from "zod";

import prismaConfig from "../configs/prismaConfig";

export const schemCreateTechFront = z.object({
  name: z.string().trim().min(1, {
    message: "Can't be empty!",
  }),
  refTech: z.string(),
  status: z.boolean().default(true),
  models: z
    .array(z.string().transform((data) => data.trim()))
    .transform((data) => {
      let models = "";
      data.forEach((model) => {
        if (model.trim() != "") {
          if (models.length) {
            models += "#";
          }
          models += model;
        }
      });

      return models;
    }),
  logo: z.string().nullable().nullish(),
});

export const schemCreateTechBack = schemCreateTechFront.merge(
  z.object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Can't be empty!",
      })
      .refine(
        async (data) => {
          const tech = await prismaConfig.technology.findUnique({
            where: {
              name: data,
            },
          });
          return !tech;
        },
        {
          message: "the name of technology exists",
        }
      ),
    refTech: z
      .string()
      .trim()
      .refine(
        async (data) => {
          //if (data == "") return true;
          const tech = await prismaConfig.technology.findUnique({
            where: {
              refTech: data,
            },
          });
          return !tech;
        },
        {
          message: "The Ref technology exists",
        }
      ),
    models: z.string(),
  })
);

export const schemEditTechBack = schemCreateTechFront.merge(
  z.object({
    id: z.number(),
  })
);
