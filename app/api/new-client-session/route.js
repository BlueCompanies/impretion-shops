import insertOne from "@/app/_lib/queries/insertOne";
import { NextResponse } from "next/server";
import { formatInTimeZone } from "date-fns-tz";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { sessionId, shopRef } = body;

    const date = new Date();
    const formattedDate = formatInTimeZone(
      date,
      "America/Bogota",
      "dd/MM/yyyy HH:mm"
    );

    // Insert a new session into the DB
    const response = await insertOne("temporal-client-session", {
      sessionId,
      shopRef,
      userOrder: [],
      createdAt: new Date(),
      formattedCreatedSessionDate: formattedDate,
      hasRequestedOrder: false,
    });

    if (response === 201) {
      return NextResponse.json({}, { status: 201 });
    } else {
      return NextResponse.json({}, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
