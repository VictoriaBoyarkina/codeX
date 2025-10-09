import { Empty } from "@/components/ui/empty";
import { Post as PostType } from "@/entities/posts/types";
import { CreateModal } from "@/features/posts/components/post/createModal";
import { Post } from "@/features/posts/components/post/post";
import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-full w-full">
      <div className="w-4/5 pt-24 mx-auto flex flex-col gap-y-10 items-center">
        <CreateModal />
        <div className="w-full bg-slate-50 rounded-lg">{children}</div>
      </div>
    </div>
  );
};

const posts: PostType[] = [];

export const FeedPage = () => {
  return (
    <Container>
      {posts.length ? (
        posts.map((post) => <Post post={post} />)
      ) : (
        <Empty
          title="Здесь пока пусто"
          description="Добавьте свой первый пост!"
        />
      )}
    </Container>
  );
};
