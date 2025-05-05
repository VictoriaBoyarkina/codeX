import { z } from "zod";
import { AuthFormFields } from "../types";
import { UserRoles } from "@/transformers/toUser";

export const signupFormSchema = z
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

export const loginFormSchema = z.object({
  nickname: z.string({
    required_error: "Это поле обязательно",
  }),
  password: z.string({
    required_error: "Это поле обязательно",
  }),
});

export type AuthForm =
  | z.infer<typeof signupFormSchema>
  | z.infer<typeof loginFormSchema>;

export const signupFields: AuthFormFields[] = [
  {
    type: "input",
    placeholder: "Имя",
    name: "firstName",
    label: "Имя",
    className: "col-span-2 lg:col-span-1",
  },
  {
    type: "input",
    placeholder: "Фамилия",
    name: "lastName",
    label: "Фамилия",
    className: "col-span-2 lg:col-span-1",
  },
  {
    type: "input",
    placeholder: "Логин",
    name: "nickname",
    label: "Логин",
    className: "col-span-2",
  },
  {
    type: "input",
    placeholder: "Email",
    name: "email",
    label: "Email",
    className: "col-span-2",
  },
  {
    type: "input",
    placeholder: "Пароль",
    name: "password",
    label: "Пароль",
    className: "col-span-2 lg:col-span-1",
  },
  {
    type: "input",
    placeholder: "Пароль",
    name: "confirmPassword",
    label: "Подтвердите пароль",
    className: "col-span-2 lg:col-span-1",
  },
  {
    type: "select",
    placeholder: "Выберете роль",
    name: "role",
    label: "Роль",
    options: [
      {
        value: UserRoles.FRONTEND_DEVELOPER,
        label: UserRoles.FRONTEND_DEVELOPER,
      },
      {
        value: UserRoles.BACKEND_DEVELOPER,
        label: UserRoles.BACKEND_DEVELOPER,
      },
      { value: UserRoles.QA_ENGINEER, label: UserRoles.QA_ENGINEER },
      { value: UserRoles.DESIGNER, label: UserRoles.DESIGNER },
      { value: UserRoles.MANAGER, label: UserRoles.MANAGER },
      { value: UserRoles.HR, label: UserRoles.HR },
    ],
    className: "col-span-2",
  },
];

export const loginFields: AuthFormFields[] = [
  {
    type: "input",
    placeholder: "Логин",
    name: "nickname",
    label: "Логин",
    className: "col-span-2",
  },
  {
    type: "input",
    placeholder: "Пароль",
    name: "password",
    label: "Пароль",
    className: "col-span-2",
  },
];
