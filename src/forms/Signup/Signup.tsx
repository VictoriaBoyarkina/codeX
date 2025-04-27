import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { formSchema } from "./schema";
import { fields } from "./fields";
import { toast } from "sonner";

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

interface SignUpFormProps {
  onLogin: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({ onLogin }) => {
  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/codex/auth/signup", {
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
          <Button type="submit" variant="light" className="rounded-[50px]">
            Регистрация
          </Button>
          <div className="text-xs lg:text-sm">
            <span>Уже есть аккаунт?</span>
            &nbsp;
            <a href="#" className="underline font-medium" onClick={onLogin}>
              Войти
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
