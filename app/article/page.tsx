"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  CreateArticleSchema,
  CreateArticleSchemaType,
} from "../../validations/article.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import TextInput from "@/components/form/TextInput";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import("@/components/editor/CustomEditor"), {
  ssr: false,
});
import { Button } from "@/components/ui/button";
import { useArticle } from "@/hooks/queryHooks/use-article";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const ArticlePage = () => {
  const { createArticle, createArticleIsLoading } = useArticle({
    withFetch: false,
  });
  const router = useRouter();

  const form = useForm<CreateArticleSchemaType>({
    resolver: zodResolver(CreateArticleSchema),
  });
  const formValue = form.watch();
  const onSubmit = (data: CreateArticleSchemaType) => {
    createArticle({
      ...data,
      onSuccess: () => {
        form.reset();
        router.push("/");
      },
    });
  };
  return (
    <div className="pb-32">
      <h2 className="text-xl font-medium">Buat Artikel</h2>
      <Form {...form}>
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <TextInput
            form={form}
            name="title"
            label="Judul"
            placeholder="Judul Artikel"
            disabled={createArticleIsLoading}
          />
          <Label>Konten</Label>
          <CustomEditor
            content={formValue.content || ""}
            setContent={(content) => {
              form.setValue("content", content);
              form.trigger("content");
            }}
          />

          <span className="text-red-500 text-sm font-medium">
            {form?.formState?.errors?.content?.message}{" "}
            <span className="opacity-0">a</span>
          </span>
          <Button disabled={createArticleIsLoading} className="w-full ">
            Simpan
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ArticlePage;
