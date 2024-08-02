import { Article, User } from "@prisma/client";

export type ArticleWithUser = Article & {
  user: User;
};
