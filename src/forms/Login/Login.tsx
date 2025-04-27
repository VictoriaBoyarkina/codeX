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

interface LoginFormProps {
  onSignup: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSignup }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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

      if ("error" in data) {
        throw new Error(data.error.message || data.error);
      }

      toast.success("Пользователь авторизован!");
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
            <a href="#" className="underline font-medium" onClick={onSignup}>
              Зарегистрироваться
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
