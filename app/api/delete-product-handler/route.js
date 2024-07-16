import updateOne from "@/app/_lib/queries/updateOne";
import { NextResponse } from "next/server";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { productId } = body;
    await updateOne(
      "temporal-client-session",
      { "userOrder.productId": productId }, // filter
      { $pull: { userOrder: { productId: productId } } } // update
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
