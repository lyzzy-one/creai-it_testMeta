import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// POST /api/user - Create a new user
export async function POST(request: NextRequest) {
  try {
    const { nickname } = await request.json();

    if (!nickname || nickname.trim().length < 2) {
      return NextResponse.json(
        { error: "닉네임은 2자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        nickname: nickname.trim(),
      },
    });

    return NextResponse.json({ userId: user.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "사용자 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
