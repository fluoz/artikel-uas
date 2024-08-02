"use client";
import { useArticle } from "@/hooks/queryHooks/use-article";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ArticleDetail = ({ params }: { params: { id: string } }) => {
  const { currentArticleData, currentArticleDataIsLoading } = useArticle({
    id: params.id,
    type: "all",
  });

  const router = useRouter();
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

export default ArticleDetail;
