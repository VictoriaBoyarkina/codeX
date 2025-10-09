import { FC } from "react";
import { Post as PostType } from "@/entities/posts/types";

import { PostTypeBadge } from "@/components/ui/postTypeBadge";
import { Typography } from "@/components/ui/typography";

interface PostProps {
  post: PostType;
}

export const Post: FC<PostProps> = ({ post }) => {
  const {
    type,
    title,
    content,
    fields,
    interactions,
    private: isPrivate,
  } = post;

  const { salaryRange, workType, location, participantLimit } = fields;

  const isAuthor = true;

  return (
    <div>
      <PostTypeBadge type={type} />
      <Typography text={title} />
      <Typography text={content} />
      {location && <Typography text={location} />}
      {participantLimit && <Typography text={participantLimit.toString()} />}
      {salaryRange && (
        <Typography
          text={`Заработная плата от ${salaryRange[0]} до ${salaryRange[1]} `}
        />
      )}
      {workType && <Typography text={`Тип работы: ${workType}`} />}
      {isAuthor &&
        interactions.map((interaction) => (
          <div>
            <Typography text={interaction.userId} />
            <Typography text={interaction.type} />
          </div>
        ))}
    </div>
  );
};
