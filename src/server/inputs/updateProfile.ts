import { z } from "zod";

export const updateProfileInputSchema = z.object({
  name: z.string(),
  gender: z.string(),
  email: z.string(),
});

export type updateProfileInput = z.TypeOf<typeof updateProfileInputSchema>;
