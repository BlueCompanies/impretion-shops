import findOne from "@/app/_lib/queries/findOne";
import { NextResponse } from "next/server";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { clientSession } = body;
    const data = await findOne("temporal-client-session", {
      sessionId: clientSession,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
