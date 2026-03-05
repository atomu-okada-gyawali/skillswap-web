import { z } from "zod";

export const PostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  postPhoto: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  tag: z.array(z.string()).optional(),
  locationType: z.string().min(1, "Location type is required"),
  availability: z.string().min(1, "Availability is required"),
  duration: z.string().optional(),
});

export type PostFormData = z.infer<typeof PostSchema>;
