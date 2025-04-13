import { SignupFormFields } from "@/forms/types";

export const fields: SignupFormFields[] = [
  {
    type: "input",
    placeholder: "Имя",
    name: "firstName",
    label: "Имя",
  },
  {
    type: "input",
    placeholder: "Фамилия",
    name: "lastName",
    label: "Фамилия",
  },
  {
    type: "input",
    placeholder: "Логин",
    name: "nickname",
    label: "Логин",
  },
  {
    type: "input",
    placeholder: "Email",
    name: "email",
    label: "Email",
  },
  {
    type: "input",
    placeholder: "Пароль",
    name: "password",
    label: "Пароль",
  },
  {
    type: "input",
    placeholder: "Пароль",
    name: "confirmPassword",
    label: "Подтвердите пароль",
  },
  {
    type: "select",
    placeholder: "Выберете роль",
    name: "role",
    label: "Роль",
    options: [
      { value: "Frontend Developer", label: "Frontend Developer" },
      { value: "Backend Developer", label: "Backend Developer" },
      { value: "QA Engineer", label: "QA Engineer" },
      { value: "Designer", label: "Designer" },
      { value: "Manager", label: "Manager" },
      { value: "HR", label: "HR" },
    ],
  },
];
