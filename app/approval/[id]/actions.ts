"use server";
import prisma from "@/lib/prismadb";

export const approveArticle = async (id: string) => {
  try {
    const approve = await prisma.article.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });

    return approve;
  } catch (error: any) {
    return {
      message: error?.message || "Something went Wrong",
    };
  }
};
