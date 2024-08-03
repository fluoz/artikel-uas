import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/validations/auth.validation";
import prisma from "@/lib/prismadb";

export async function POST(request: Request): Promise<any> {
  try {
    const body = await request.json();

    const validated = RegisterSchema.safeParse(body);

    if (!validated.success) {
      const message =
        "Invalid body. " + (validated.error.errors[0]?.message ?? "");
      return new Response(message, { status: 400 });
    }

    const { data: valid } = validated;

    const userExist = await prisma.user.findUnique({
      where: {
        email: valid.email,
      },
    });

    if (userExist) {
      return new NextResponse("User already exist", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(valid.password, 10);

    await prisma.user.create({
      data: {
        name: valid.name,
        email: valid.email,
        hashedPassword: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json({
      message: "Success",
    });
  } catch (error: any) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
