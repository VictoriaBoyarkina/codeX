import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormFields } from "@/types";
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

const formSchema = z.object({
  login: z.string({
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

const fields: LoginFormFields[] = [
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
];

const LoginForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-3">
        {fields.map((fieldProps) => (
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
        ))}
      </form>
    </Form>
  );
};

export default LoginForm;
