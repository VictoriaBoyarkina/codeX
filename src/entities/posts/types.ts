enum PostType {
  Vacancy = "Вакансия",
  Event = "Событие",
  Content = "Контент",
  System = "Системный",
}

enum InteractionType {
  Like = "like",
  Response = "response",
  Invite = "invite",
}

enum InteractionStatus {
  Accepted = "accepted",
  Declined = "declined",
  Pending = "pending",
}

enum WorkType {
  office = "Оффис",
  remote = "Удаленно",
  hybrid = "Гибрид",
}

type Interaction = {
  userId: string;
  type: InteractionType;
  status?: InteractionStatus;
};

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  type: PostType;
  direction: string;
  previewImage?: string;
  private?: boolean;
  fields: {
    salaryRange?: [number, number];
    workType?: WorkType;
    location?: string;
    participantLimit?: number;
  };
  interactions: Interaction[];
};

export type { Post, Interaction };
export { PostType, WorkType };
