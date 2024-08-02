"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArticleWithUser } from "@/types/types";
import _dayjs from "@/lib/dayjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<ArticleWithUser>[] = [
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) => {
      return _dayjs(row.original.createdAt).format("DD MMM YYYY");
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "Author",
    header: "Author",
    cell: ({ row }) => {
      return row.original.user.name;
    },
  },
  {
    accessorKey: "published",
    header: "Status",
    cell: ({ row }) => {
      return row.original.published ? "Sudah Di Publish" : "Menunggu Approval";
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      if (row.original.published) {
        return null;
      }

      return (
        <Button>
          <Link href={`/approval/${row.original.id}`}>Lihat</Link>
        </Button>
      );
    },
  },
];
