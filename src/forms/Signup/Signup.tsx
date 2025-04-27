import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignupFormFields } from "@/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z
  .object({
    firstName: z.string({
      required_error: "Это поле обязательно",
    }),
    lastName: z.string({
      required_error: "Это поле обязательно",
    }),
    login: z.string({
      required_error: "Это поле обязательно",
    }),
    email: z
      .string({
        required_error: "Это поле обязательно",
      })
      .email({ message: "Укажите валидный email" }),
    password: z
      .string({
        required_error: "Это поле обязательно",
      })
      .min(5, { message: "Минимум 8 символов" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
        message: "Пароль должен содержать буквы и цифры",
      }),
    confirmPassword: z.string({
      required_error: "Это поле обязательно",
    }),
    role: z.string({
      required_error: "Это поле обязательно",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

const fields: SignupFormFields[] = [
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
    name: "login",
    label: "Логин",
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
    label: "Пароль еще раз",
  },
  {
    type: "select",
    placeholder: "Выберете роль",
    name: "role",
    label: "Роль",
    options: [
      { value: "frontendDeveloper", label: "Frontend Developer" },
      { value: "backendDeveloper", label: "Backend Developer" },
      { value: "QAEngineer", label: "QA Engineer" },
      { value: "designer", label: "Designer" },
      { value: "manager", label: "Manager" },
      { value: "HR", label: "HR" },
    ],
  },
];

const SignUpForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-3">
        {fields.map((fieldProps) => {
          return fieldProps.type === "input" ? (
            <FormField
              key={fieldProps.name}
              control={form.control}
              name={fieldProps.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldProps.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10"
                      {...field}
                      placeholder={fieldProps.placeholder}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldProps.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger size="lg" className="w-full">
                        <SelectValue placeholder="Выберете роль" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fieldProps.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </form>
    </Form>
  );
};

export default SignUpForm;
