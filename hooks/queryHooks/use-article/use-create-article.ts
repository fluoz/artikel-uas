import { CreateArticleSchemaType } from "@/validations/article.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface DataProps extends CreateArticleSchemaType {
  onSuccess?: () => void;
}

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createArticle,
    isPending: createArticleIsLoading,
    variables: dataProps,
  } = useMutation({
    mutationFn: (data: DataProps) => {
      return axios.post("/api/article", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["article"],
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
    createArticle,
    createArticleIsLoading,
  };
};
