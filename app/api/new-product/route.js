// POST API route
import updateOne from "@/app/_lib/dataHandlers/updateOne";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { clientSession, generatedId, productData } = body;

    // Inserts a new product into the temporal-client-session "userOrder" field.
    await updateOne(
      "temporal-client-session",
      { sessionId: clientSession },
      {
        $push: {
          userOrder: {
            ...productData,
            productId: generatedId,
          },
        },
      }
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("Error in POST request:", error.message);
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
