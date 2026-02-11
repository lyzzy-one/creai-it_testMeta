import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getResultByScore } from "../../../data/results";

// POST /api/result - Save test result
export async function POST(request: NextRequest) {
  try {
    const { userId, score, answers } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    if (typeof score !== "number" || score < 0) {
      return NextResponse.json(
        { error: "유효하지 않은 점수입니다." },
        { status: 400 }
      );
    }

    // Get result type based on score
    const result = getResultByScore(score);

    // Save result to database
    const testResult = await prisma.testResult.create({
      data: {
        userId,
        score,
        resultType: result.id,
        answers: answers || {},
      },
    });

    return NextResponse.json(
      {
        resultId: testResult.id,
        score: testResult.score,
        resultType: result.id,
        title: result.title,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json(
      { error: "결과 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}
