import { PostType } from "@/entities/posts/types";
import { FC } from "react";
import { Badge } from "./badge";
import { Typography } from "./typography";

interface PostTypeBadgeProps {
  type: PostType;
}

const classNamesMap = {
  [PostType.Vacancy]: "text-purple-700",
  [PostType.Event]: "text-sky-700",
  [PostType.Content]: "text-emerald-700",
  [PostType.System]: "text-pink-700",
};

export const PostTypeBadge: FC<PostTypeBadgeProps> = ({ type }) => {
  const className = classNamesMap[type];

  return (
    <Badge className={className}>
      <Typography text={type} />
    </Badge>
  );
};
