import { z } from "zod";
import { ACCEPTED_IMAGE_MIME_TYPES } from "../configs/validition_config";
import prismaConfig from "../configs/prismaConfig";
import { zfd } from "zod-form-data";

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
  logo: z.any().refine((files) => {
    if (!files?.length) return true;

    return ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type);
  }, "Your file type is not accepted"),
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
    status: z.any().transform((data) => data == "true"),
    logo: z.any().refine((file) => {
      if (!file || file == "undefined") return true;
      return ACCEPTED_IMAGE_MIME_TYPES.includes(file.type);
    }, "Your file type is not accepted"),
  })
);
