import {
  EmptyShadcn,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./emptyShadcn";
import { ReactElement, ReactNode } from "react";
import { SquarePen } from "lucide-react";

interface EmptyProps {
  title?: string;
  description?: string;
  icon?: ReactElement;
  content?: ReactNode;
}

export function Empty({
  title = "Ничего не найдено",
  description = "Попробуйте изменить критерии поиска",
  icon = <SquarePen />,
  content,
}: EmptyProps) {
  return (
    <EmptyShadcn className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {content && <EmptyContent>{content}</EmptyContent>}
    </EmptyShadcn>
  );
}
