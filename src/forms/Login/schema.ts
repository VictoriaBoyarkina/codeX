import { z } from "zod";

export const formSchema = z.object({
  nickname: z.string({
    required_error: "Это поле обязательно",
  }),
  password: z.string({
    required_error: "Это поле обязательно",
  }),
});

export type LoginForm = z.infer<typeof formSchema>;
