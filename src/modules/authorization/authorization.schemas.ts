import { z } from "zod";

export const updateRoleRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: z.enum(["ACCEPTED", "REJECTED"]),
  }),
});

export type UpdateRoleRequestInput = z.infer<typeof updateRoleRequestSchema>;
