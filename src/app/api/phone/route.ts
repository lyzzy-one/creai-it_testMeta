import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// POST /api/phone - Save phone number for event
export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "전화번호가 필요합니다." },
        { status: 400 }
      );
    }

    // Clean phone number (remove non-digits)
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");

    if (cleanNumber.length < 10 || cleanNumber.length > 11) {
      return NextResponse.json(
        { error: "유효하지 않은 전화번호입니다." },
        { status: 400 }
      );
    }

    // Save phone entry
    const phoneEntry = await prisma.phoneEntry.create({
      data: {
        phoneNumber: cleanNumber,
      },
    });

    return NextResponse.json(
      { id: phoneEntry.id, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving phone:", error);
    return NextResponse.json(
      { error: "전화번호 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}
