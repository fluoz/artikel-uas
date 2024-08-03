"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArticle } from "@/hooks/queryHooks/use-article";
import { useComment } from "@/hooks/queryHooks/use-comment";
import _dayjs from "@/lib/dayjs";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ArticleDetail = ({ params }: { params: { id: string } }) => {
  const [comment, setComment] = useState("");
  const { currentArticleData, currentArticleDataIsLoading } = useArticle({
    id: params.id,
    type: "all",
  });
  const {
    commentData,
    commentDataIsLoading,
    createComment,
    createCommentIsLoading,
  } = useComment({
    idArticle: params.id,
  });
  const { data: session } = useSession();
  const router = useRouter();

  const onAddComment = () => {
    setComment("");
    createComment({
      articleId: params.id,
      content: comment,
    });
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
          </div>
          <div
            className="ck-content prose mt-8 !max-w-none"
            dangerouslySetInnerHTML={{
              __html: currentArticleData?.content || "",
            }}
          ></div>
          {session && (
            <div className="mt-8 flex gap-4 justify-between items-center">
              <div className="w-full">
                <Input
                  startAdornment={<Search className="w-4 h-4" />}
                  placeholder="Komentar"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button
                onClick={onAddComment}
                disabled={createCommentIsLoading || !comment}
              >
                Kirim
              </Button>
            </div>
          )}
          <div className="mt-8 pb-16">
            {commentDataIsLoading && (
              <p className="text-xl mt-8 text-center">Loading...</p>
            )}
            <div className="flex flex-col gap-4">
              {!commentDataIsLoading &&
                commentData &&
                commentData?.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                    </div>
                    <div>
                      <h2 className="font-medium text-base">
                        {item.author.name}{" "}
                        <span className="text-sm">
                          - {_dayjs(item.createdAt).fromNow()}
                        </span>
                      </h2>
                      <p className="text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
