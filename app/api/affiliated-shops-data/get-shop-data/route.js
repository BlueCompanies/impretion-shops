import findOne from "@/app/_lib/queries/findOne";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { shopRef } = body;
    const data = await findOne("affiliated-shops", {
      shopRef,
    });

    if (data) {
      return NextResponse.json({}, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
