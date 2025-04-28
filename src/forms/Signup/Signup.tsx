import { FC, useState } from "react";
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
import { formSchema, SignupForm as SignupFormType } from "./schema";
import { fields } from "./fields";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@/slices/authSlice";
import { useAppDispatch } from "@/store";

const getColSpanByName = (fieldName: string) => {
  switch (fieldName) {
    case "password":
    case "confirmPassword":
    case "firstName":
    case "lastName":
      return "col-span-2 lg:col-span-1";
    default:
      return "col-span-2";
  }
};

const SignUpForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: SignupFormType) => {
    try {
      setIsLoading(true);
      await dispatch(register(values)).unwrap();

      navigate("/");
    } catch (error) {
      toast.error((error as Error).message || "Не удалось выполнить вход");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-y-2 lg:gap-y-3 gap-x-2"
      >
        {fields.map((fieldProps) => {
          return fieldProps.type === "input" ? (
            <FormField
              key={fieldProps.name}
              control={form.control}
              name={fieldProps.name}
              render={({ field }) => (
                <FormItem className={getColSpanByName(fieldProps.name)}>
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
            loading={isLoading}
            type="submit"
            variant="light"
            className="rounded-[50px]"
          >
            Регистрация
          </Button>
          <div className="flex gap-x-1 text-xs flex-wrap lg:text-sm">
            <span>Уже есть аккаунт?</span>
            <Link className="underline font-medium" to="/auth/login">
              Войти
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
