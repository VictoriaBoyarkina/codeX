import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  eventDefaultValues,
  eventSchema,
  vacancyDefaultValues,
  vacancySchema,
} from "./schemas";
import { toast } from "sonner";
import {
  Field,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { PostType, WorkType } from "@/entities/posts/types";
import { FC } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const forms = {
  [PostType.Vacancy]: {
    schema: vacancySchema,
    defaultValues: vacancyDefaultValues,
  },
  [PostType.Event]: {
    schema: eventSchema,
    defaultValues: eventDefaultValues,
  },
};

interface CreateFormProps {
  formType: Exclude<PostType, PostType.System | PostType.Content>;
}

export const CreateForm: FC<CreateFormProps> = ({ formType }) => {
  const strategy = forms[formType];

  const form = useForm<z.infer<typeof vacancySchema>>({
    resolver: zodResolver(vacancySchema),
    defaultValues: vacancyDefaultValues,
  });

  const onSubmit = async (values: any) => {
    try {
      console.log(values);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Field control={form.control} name="title" label="Название вакансии *">
          {(field) => <Input {...field} placeholder="Название вакансии" />}
        </Field>

        <Field
          control={form.control}
          name="description"
          label="Описание вакансии*"
        >
          {(field) => <Textarea {...field} placeholder="Описание вакансии" />}
        </Field>

        <Typography text="Диапазон зарплаты" />
        <Field control={form.control} name="salaryRangeFrom">
          {(field) => <Input {...field} placeholder="от" />}
        </Field>

        <Field control={form.control} name="salaryRangeTo">
          {(field) => <Input {...field} placeholder="до" />}
        </Field>

        <Field control={form.control} name="workType">
          {(field) => (
            <RadioGroup {...field} defaultValue={WorkType.office}>
              {Object.entries(WorkType).map(([key, value]) => (
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor="r1">{value}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </Field>
      </form>
    </Form>
  );
};
