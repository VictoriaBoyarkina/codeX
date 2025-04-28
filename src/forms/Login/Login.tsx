import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { formSchema, LoginForm as LoginFormType } from "./schema";
import { fields } from "./fileds";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { login } from "@/slices/authSlice";

const LoginForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: LoginFormType) => {
    try {
      setIsLoading(true);
      await dispatch(login(values)).unwrap();

      navigate("/");
    } catch (error) {
      toast.error((error as Error).message || "Не удалось зарегестрироваться");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2 lg:gap-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map((fieldProps) => (
          <FormField
            key={fieldProps.name}
            control={form.control}
            name={fieldProps.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldProps.label} *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={fieldProps.placeholder} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="col-span-2 flex items-center gap-x-4 mt-4">
          <Button
            loading={isLoading}
            type="submit"
            variant="light"
            className="rounded-[50px]"
          >
            Войти
          </Button>
          <div className="flex gap-x-1 wrap flex-wrap text-xs lg:text-sm">
            <span>Нет аккаунта?</span>
            <Link className="underline font-medium" to="/auth/signup">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
