import { z } from "zod";

export const forgotpasswordSchema = z.object({
    email: z.string(),
})

export type forgotpasswordInput = z.TypeOf<typeof forgotpasswordSchema>;