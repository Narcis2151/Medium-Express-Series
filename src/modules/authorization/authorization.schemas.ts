import {z} from "zod";

export const updateRoleSchema = z.object({
  params: z.object({
    id: z.string({required_error: "Request ID is required"}),
  }),
  body: z.object({
    status: z.enum(["ACCEPTED", "REJECTED"], {required_error: "Status is required"}),
  }),
});

export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
