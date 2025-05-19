import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
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
import { Button } from "@/components/ui/button";
import {
  AuthForm as AuthFormType,
  loginFormSchema,
  signupFormSchema,
  signupFields,
  loginFields,
} from "./schema";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { register, login } from "@/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store";

const formStrategies = {
  signup: {
    schema: signupFormSchema,
    fields: signupFields,
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    submitText: "Регистрация",
    alternateText: "Уже есть аккаунт?",
    linkText: "Войти",
    linkTo: "/auth/login",
    submitFn: register,
  },
  login: {
    schema: loginFormSchema,
    fields: loginFields,
    defaultValues: {
      nickname: "",
      password: "",
    },
    submitText: "Войти",
    alternateText: "Нет аккаунта?",
    linkText: "Зарегистрироваться",
    linkTo: "/auth/signup",
    submitFn: login,
  },
};

interface AuthFormProps {
  formStrategy: "signup" | "login";
}

const AuthForm: FC<AuthFormProps> = ({ formStrategy }) => {
  const isSubmitting = useAppSelector((store) => store.auth.isSubmitting);
  const strategy = formStrategies[formStrategy];

  const form = useForm<AuthFormType>({
    resolver: zodResolver(strategy.schema),
    defaultValues: strategy.defaultValues,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: AuthFormType) => {
    try {
      await dispatch(strategy.submitFn(values)).unwrap();

      navigate("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-y-2 lg:gap-y-3 gap-x-2"
      >
        {strategy.fields.map((fieldProps) => {
          return fieldProps.type === "input" ? (
            <FormField
              key={fieldProps.name}
              control={form.control}
              name={fieldProps.name}
              render={({ field }) => (
                <FormItem className={fieldProps.className}>
                  <FormLabel>{fieldProps.label} *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={fieldProps.placeholder} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              key={fieldProps.name}
              control={form.control}
              name={fieldProps.name}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{fieldProps.label} *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
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
        <div className="col-span-2 flex items-center gap-x-4 mt-4">
          <Button
            loading={isSubmitting}
            type="submit"
            variant="light"
            className="rounded-[50px]"
          >
            {strategy.submitText}
          </Button>
          <div className="flex gap-x-1 text-xs flex-wrap lg:text-sm">
            <span>{strategy.alternateText}</span>
            <Link className="underline font-medium" to={strategy.linkTo}>
              {strategy.linkText}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
