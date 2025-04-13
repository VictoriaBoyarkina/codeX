import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z.string().min(1, "Поле обязательно для заполнения"),
    lastName: z.string().min(1, "Поле обязательно для заполнения"),
    nickname: z.string().min(1, "Поле обязательно для заполнения"),
    email: z
      .string()
      .min(1, "Поле обязательно для заполнения")
      .email({ message: "Укажите валидный email" }),
    password: z
      .string()
      .min(1, "Поле обязательно для заполнения")
      .min(5, { message: "Минимум 8 символов" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
        message: "Пароль должен содержать буквы и цифры",
      }),
    confirmPassword: z.string().min(1, "Поле обязательно для заполнения"),
    role: z.string().min(1, "Поле обязательно для заполнения"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
