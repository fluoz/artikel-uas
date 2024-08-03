import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<any> {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const id = params.id;
  const type = searchParams.get("type");

  if (!type) {
    return new NextResponse("bad request", { status: 400 });
  }

  try {
    if (type === "approval") {
      const currentUser = await getSession();

      if (!currentUser || currentUser.user.role !== UserRole.ADMIN) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const article = await prisma.article.findFirst({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });

      if (!article) {
        return new NextResponse("Not Found", { status: 404 });
      }

      return NextResponse.json({
        data: article,
      });
    }

    if (type === "all") {
      const article = await prisma.article.findFirst({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });

      if (!article || !article.published) {
        return new NextResponse("Not Found", { status: 404 });
      }

      return NextResponse.json({
        data: article,
      });
    }
  } catch (error) {
    console.log("[GET_ARTICLE]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
