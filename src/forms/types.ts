type InputProps = {
  type: "input";
  placeholder: string;
  name: string;
  label: string;
};

type Option = {
  value: string;
  label: string;
};

type SelectProps = Omit<InputProps, "type"> & {
  type: "select";
  options: Option[];
};

type SignupFormFields =
  | (Omit<InputProps, "name"> & {
      name:
        | "firstName"
        | "lastName"
        | "email"
        | "nickname"
        | "password"
        | "confirmPassword";
    })
  | (Omit<SelectProps, "name"> & { name: "role" });

type LoginFormFields =
  | Omit<InputProps, "name"> & {
      name: "nickname" | "password";
    };

export type { InputProps, SelectProps, SignupFormFields, LoginFormFields };
