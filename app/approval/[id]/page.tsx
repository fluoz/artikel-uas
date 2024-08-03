"use client";
import { useArticle } from "@/hooks/queryHooks/use-article";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { approveArticle } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const DetailApprovePage = ({ params }: { params: { id: string } }) => {
  const { currentArticleData, currentArticleDataIsLoading } = useArticle({
    id: params.id,
    type: "approval",
  });
  const router = useRouter();
  const onApprove = async () => {
    try {
      await approveArticle(params.id);
      router.push("/approval");
    } catch (err) {
      console.error(err);
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!currentArticleData && !currentArticleDataIsLoading) {
      router.push("/");
    }
  }, [currentArticleData, currentArticleDataIsLoading]);

  return (
    <div>
      {currentArticleDataIsLoading && (
        <p className="text-xl mt-8 text-center">Loading...</p>
      )}
      {!currentArticleDataIsLoading && currentArticleData && (
        <>
          <div className="flex justify-between">
            <h2 className=" text-xl font-bold">{currentArticleData?.title}</h2>
            <Button onClick={onApprove}>Approve</Button>
          </div>
          <div
            className="ck-content prose mt-8 !max-w-none"
            dangerouslySetInnerHTML={{
              __html: currentArticleData?.content || "",
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default DetailApprovePage;
