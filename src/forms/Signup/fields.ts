import { SignupFormFields } from "@/forms/types";
import { UserRoles } from "@/types";

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
  },
];
