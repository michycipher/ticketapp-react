
import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(3, "Title is required and must be at least 3 characters."),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "closed"], {
    errorMap: () => ({ message: "Status must be open, in_progress, or closed." }),
  }),
});
