import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { formSchema } from "./schema";
import { fields } from "./fileds";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { login } from "@/slices/authSlice";
import { toUser } from "@/transformers/toUser";
import { toResponseData } from "@/transformers/toResponseData";

const LoginForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/codex/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      const user = toUser(toResponseData(data));

      if ("error" in data || !user) {
        throw new Error(
          data.error.message || data.error || "Неизвестный пользователь!"
        );
      }

      dispatch(login(user));
      navigate("/");
    } catch (error) {
      toast.error((error as Error).message);
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
          <Button type="submit" variant="light" className="rounded-[50px]">
            Войти
          </Button>
          <div className="text-xs lg:text-sm">
            <span>Нет аккаунта?</span>
            &nbsp;
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
