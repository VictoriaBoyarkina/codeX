type InputProps = {
  type: "input";
  placeholder: string;
  name: string;
  label: string;
  className?: string;
};

type Option = {
  value: string;
  label: string;
};

type SelectProps = Omit<InputProps, "type"> & {
  type: "select";
  options: Option[];
};

type AuthFormFields =
  | (Omit<InputProps, "name"> & {
      name:
        | "firstName"
        | "lastName"
        | "email"
        | "nickname"
        | "password"
        | "confirmPassword";
    })
  | (Omit<SelectProps, "name"> & { name: "role" })
  | (Omit<InputProps, "name"> & {
      name: "nickname" | "password";
    });

export type { InputProps, SelectProps, AuthFormFields };
