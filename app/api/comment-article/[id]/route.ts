import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getSession from "@/lib/getSession";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const comments = await prisma.comment.findMany({
      where: {
        articleId: id,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      data: comments,
    });
  } catch (err: any) {
    console.log("[GET_COMMENT_ARTICLE]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const currentUser = await getSession();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();

    const content = body?.content;
    const articleId = body?.articleId;

    if (!content || !articleId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const addComment = await prisma.comment.create({
      data: {
        content,
        articleId: articleId,
        authorId: currentUser.user.id,
      },
    });

    return NextResponse.json({
      data: addComment,
    });
  } catch (error: any) {
    console.log("[PATCH_COMMENT_ARTICLE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
