import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
