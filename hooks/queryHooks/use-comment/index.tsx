import { CommentWithUser } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCreateComment } from "./use-create-comment";

interface Props {
  idArticle: string;
  withFetch?: boolean;
}

export const useComment = ({ idArticle, withFetch = true }: Props) => {
  const { data: commentData, isLoading: commentDataIsLoading } = useQuery<
    CommentWithUser[]
  >({
    queryKey: ["comment-article", idArticle],
    enabled: withFetch,
    queryFn: async () => {
      const response = await axios.get(`/api/comment-article/${idArticle}`);
      return response.data.data;
    },
  });

  const { createComment, createCommentIsLoading } = useCreateComment();

  return {
    commentData,
    commentDataIsLoading,
    createComment,
    createCommentIsLoading,
  };
};
