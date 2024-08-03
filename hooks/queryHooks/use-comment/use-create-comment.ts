import { CreateArticleSchemaType } from "@/validations/article.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface Payload {
  content: string;
  articleId: string;
}

interface DataProps extends Payload {
  onSuccess?: () => void;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createComment,
    isPending: createCommentIsLoading,
    variables: dataProps,
  } = useMutation({
    mutationFn: (data: DataProps) => {
      return axios.patch("/api/comment-article/" + data.articleId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment-article", dataProps?.articleId],
      });

      dataProps?.onSuccess?.();
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createComment,
    createCommentIsLoading,
  };
};
