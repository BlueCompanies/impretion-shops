import insertOrderData from "@/app/_lib/dataHandlers/insertOrderData";
import { NextResponse } from "next/server";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { clientSession, generatedId, productData } = body;

    await insertOrderData(clientSession, {
      productId: generatedId,
      productData,
    });

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
