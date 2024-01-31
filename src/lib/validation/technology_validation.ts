import { z } from "zod";
import { ACCEPTED_IMAGE_MIME_TYPES } from "../configs/validition_config";

export const schemCreateTechFront = z.object({
  name: z.string().trim().min(1, {
    message: "Can't be empty!",
  }),
  refTch: z.string().nullable(),
  status: z.boolean().default(true),
  models: z.string().nullable(),
  description: z
    .any()
    .nullable()
    .transform((data) => {
      //if (JSON.parse(data)) return JSON.parse(data);

      return data;
    }),
  logo: z.any().refine((files) => {
    if (!files.length) return true;

    if (!ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type)) return false;

    return true;
  }, "Your file type is not accepted"),
});

// const schemCreateTechBack = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(1, {
//       message: "Can't be empty!",
//     })
//     .refine(
//       async (data) => {
//         const tech = await prismaConfig.technology.findUnique({
//           where: {
//             name: data,
//           },
//         });
//         return !tech;
//       },
//       {
//         message: "This technology exists",
//       }
//     ),
//   status: z
//     .any()
//     .default(true)
//     .transform((data: any) => {
//       if (typeof data == "string") return data.toLocaleLowerCase() == "true";
//       return data;
//     }),
//   models: z.string().nullable(),
//   description: z
//     .any()
//     .nullable()
//     .transform((data) => {
//       //if (JSON.parse(data)) return JSON.parse(data);

//       return data;
//     }),
//   logo: z.any().refine((files) => {
//     console.log("validot", files);
//     if (files == null) return true;

//     const myfile = files[0];

//     return (
//       !myfile || (myfile && ACCEPTED_IMAGE_MIME_TYPES.includes(myfile.type))
//     );
//   }, "Your file type is not accepted"),
// });
