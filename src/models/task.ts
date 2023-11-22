import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const HasIDSchema = z.object({
  id: z.string(),
});

export const HasAuditSchema = z.object({
  createdBy: z.string(),
  dateCreated: z.string(),
  modifiedBy: z.string().optional(),
  dateModified: z.string().optional(),
});

export const TaskBasicSchema = z.object({
  code: z.string().min(1, "Code is required"),
  title: z.string().min(1, "Title is required"),
  status: z.string().min(1, "Status is required"),
  label: z.string().min(1, "Label is required"),
  priority: z.string().min(1, "Priority is required"),
});

export const TaskAuditSchema = z.object({});

export const TaskSchema =
  TaskBasicSchema.merge(HasIDSchema).merge(HasAuditSchema);

export type TTaskForm = z.infer<typeof TaskBasicSchema>;

export type TTask = z.infer<typeof TaskSchema>;
