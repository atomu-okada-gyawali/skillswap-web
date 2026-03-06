import { z } from "zod";

export const ProposalSchema = z.object({
  offeredSkill: z.string().min(1, "Please select what you offer"),
  message: z
    .string()
    .min(10, "Proposal details must be at least 10 characters"),
});

export type ProposalFormData = z.infer<typeof ProposalSchema>;

export const ScheduleSchema = z.object({
  proposedDate: z.string().min(1, "Please select a date"),
  proposedTime: z.string().min(1, "Please select a time"),
  durationMinutes: z.number().min(15, "Duration must be at least 15 minutes"),
});

export type ScheduleFormData = z.infer<typeof ScheduleSchema>;

export const ProposalFormSchema = ProposalSchema.merge(ScheduleSchema);
export type ProposalFormDataComplete = z.infer<typeof ProposalFormSchema>;
