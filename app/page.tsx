"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArticle } from "@/hooks/queryHooks/use-article";
import Link from "next/link";

export default function Home() {
  const { articleData, articleDataIsLoading } = useArticle({});

  return (
    <DashboardLayout>
      {articleDataIsLoading && (
        <div className="text-xl text-center">Loading...</div>
      )}
      {!articleDataIsLoading && !articleData && (
        <div className="text-xl text-center">No data</div>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!articleDataIsLoading &&
          articleData &&
          articleData?.map((article) => (
            <Card
              key={article.id}
              className="w-full hover:bg-slate-100 cursor-pointer"
            >
              <Link href={"/article/" + article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {article.content.replace(/(<([^>]+)>)/gi, "").length > 200 ? (
                    <>
                      {article.content
                        .replace(/(<([^>]+)>)/gi, "")
                        .slice(0, 200)}
                      ...
                    </>
                  ) : (
                    <>{article.content.replace(/(<([^>]+)>)/gi, "")}</>
                  )}
                </CardContent>
              </Link>
            </Card>
          ))}
      </div>
    </DashboardLayout>
  );
}
