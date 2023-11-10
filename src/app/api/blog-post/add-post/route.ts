import prisma from "@/utils/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json();
    const savedUser = await prisma.post.create({
      data: postData,
    });
    return NextResponse.json(savedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
