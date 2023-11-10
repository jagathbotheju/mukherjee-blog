import prisma from "@/utils/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany();
    if (posts && posts.length) {
      return NextResponse.json({
        success: true,
        data: posts,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to fetch posts, please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
