import { z } from "zod";

const commonFields = {
  title: z.string().min(1, "Поле обязательно для заполнения"),
  description: z.string().min(1, "Поле обязательно для заполнения"),
};

export const vacancySchema = z.object({
  ...commonFields,
  salaryRangeFrom: z.string().min(1, "Поле обязательно для заполнения"),
  salaryRangeTo: z.string().min(1, "Поле обязательно для заполнения"),
  workType: z.string().min(1, "Поле обязательно для заполнения"),
});

export const eventSchema = z.object({
  ...commonFields,
  eventType: z.string().min(1, "Поле обязательно для заполнения"),
  members: z.string().min(1, "Поле обязательно для заполнения"),
  location: z.string().min(1, "Поле обязательно для заполнения"),
});

export type CreatePostForm =
  | z.infer<typeof vacancySchema>
  | z.infer<typeof eventSchema>;

export const vacancyDefaultValues = {
  title: "",
  description: "",
  salaryRangeTo: "",
  salaryRangeFrom: "",
  workType: "",
};

export const eventDefaultValues = {
  title: "",
  description: "",
  eventType: "",
  members: "",
  location: "",
};
