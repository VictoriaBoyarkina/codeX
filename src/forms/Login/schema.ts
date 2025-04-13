import { z } from "zod";

export const formSchema = z.object({
  nickname: z.string({
    required_error: "Это поле обязательно",
  }),
  password: z
    .string({
      required_error: "Это поле обязательно",
    })
    .min(5, { message: "Минимум 8 символов" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
      message: "Пароль должен содержать буквы и цифры",
    }),
});
