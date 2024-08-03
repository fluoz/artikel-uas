import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getSession from "@/lib/getSession";
import { CreateArticleSchema } from "@/validations/article.validation";
export async function GET(req: Request): Promise<any> {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);

  const published = searchParams.get("published");
  console.log("published", published);
  try {
    const article = await prisma.article.findMany({
      where: {
        published: Boolean(published) || undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      data: article,
    });
  } catch (error) {
    console.log("[GET_ARTICLE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function POST(req: Request): Promise<any> {
  try {
    const currentUser = await getSession();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();

    const validated = CreateArticleSchema.safeParse(body);

    if (!validated.success) {
      const message =
        "Invalid body. " + (validated.error.errors[0]?.message ?? "");
      return new Response(message, { status: 400 });
    }

    const { data: valid } = validated;

    const article = await prisma.article.create({
      data: {
        content: valid.content,
        published: false,
        title: valid.title,
        userId: currentUser?.user?.id,
      },
    });

    return NextResponse.json(article);
  } catch (error: any) {
    console.log("CREATE_ARTICLE", error);
    return {
      message: error?.message,
    };
  }
}
