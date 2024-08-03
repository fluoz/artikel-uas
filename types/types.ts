import { Article, Comment, User } from "@prisma/client";

export type ArticleWithUser = Article & {
  user: User;
};

export type CommentWithUser = Comment & {
  author: User;
};
