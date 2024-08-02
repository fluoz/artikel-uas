"use client";
import { columns } from "@/components/table/approval-table/column";
import { ApprovalDataTable } from "@/components/table/approval-table/data-table";
import { useArticle } from "@/hooks/queryHooks/use-article";
import React from "react";

const ApprovalPage = () => {
  const { articleData, articleDataIsLoading } = useArticle({});

  return (
    <div>
      <h2 className="text-xl font-medium mb-8">Approve Artikel</h2>
      <ApprovalDataTable
        columns={columns}
        data={articleData || []}
        isLoading={articleDataIsLoading}
      />
    </div>
  );
};

export default ApprovalPage;
