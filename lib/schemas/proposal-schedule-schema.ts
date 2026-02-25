import z from "zod";

export const ProposalSchema = z.object({
  senderId: z.string().min(1, "Sender ID is required"),
  receiverId: z.string().min(1, "Receiver ID is required"),
  postId: z.string().min(1, "Post ID is required"),
  offeredSkill: z.string().min(1, "Offered skill is required"),
  message: z.string().min(1, "Message is required"),
});

export type Proposal = z.infer<typeof ProposalSchema>;

export const ScheduleSchema = z.object({
  proposalId: z.string().min(1, "Proposal ID is required"),
  proposedDate: z.preprocess((val) => (val ? new Date(val as string) : undefined), z.date()),
  proposedTime: z.string().min(1, "Proposed time is required"),
  durationMinutes: z.number().min(15, "Duration must be at least 15 minutes"),
});

export type Schedule = z.infer<typeof ScheduleSchema>;
