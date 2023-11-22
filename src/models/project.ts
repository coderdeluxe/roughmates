import { z } from "zod";

export const HasIDSchema = z.object({
  id: z.string(),
});

export const HasAuditSchema = z.object({
  createdBy: z.string(),
  dateCreated: z.string(),
  modifiedBy: z.string().optional(),
  dateModified: z.string().optional(),
});

export const ProjectBasicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export const ProjectAuditSchema = z.object({});

export const ProjectSchema =
  ProjectBasicSchema.merge(HasIDSchema).merge(HasAuditSchema);

export type TProjectForm = z.infer<typeof ProjectBasicSchema>;

export type TProject = z.infer<typeof ProjectSchema>;
