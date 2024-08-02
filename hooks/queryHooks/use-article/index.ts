import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCreateArticle } from "./use-create-article";
import { ArticleWithUser } from "@/types/types";

interface Props {
  published?: boolean;
  withFetch?: boolean;
  id?: string;
  type?: "approval" | "all";
}

export const useArticle = ({
  published,
  withFetch = true,
  id,
  type,
}: Props) => {
  const { data: articleData, isLoading: articleDataIsLoading } = useQuery<
    ArticleWithUser[]
  >({
    queryKey: ["article"],
    enabled: withFetch,
    queryFn: async () => {
      const response = await axios.get("/api/article", {
        params: {
          published,
        },
      });

      return response.data.data;
    },
  });

  const { data: currentArticleData, isLoading: currentArticleDataIsLoading } =
    useQuery<ArticleWithUser>({
      queryKey: ["article", id, type],
      enabled: withFetch && !!id && !!type,
      queryFn: async () => {
        const response = await axios.get(`/api/article/${id}`, {
          params: {
            type,
          },
        });

        return response.data.data;
      },
    });

  const { createArticle, createArticleIsLoading } = useCreateArticle();

  return {
    articleData,
    articleDataIsLoading,
    createArticle,
    createArticleIsLoading,
    currentArticleData,
    currentArticleDataIsLoading,
  };
};
