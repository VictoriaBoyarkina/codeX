import { LoginFormFields } from "@/forms/types";

export const fields: LoginFormFields[] = [
  {
    type: "input",
    placeholder: "Логин",
    name: "nickname",
    label: "Логин",
  },
  {
    type: "input",
    placeholder: "Пароль",
    name: "password",
    label: "Пароль",
  },
];
