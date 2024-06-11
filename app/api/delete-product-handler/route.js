import awsS3 from "@/app/_lib/aws/awsS3";
import insertOrderData from "@/app/_lib/dataHandlers/insertOrderData";
import updateOne from "@/app/_lib/dataHandlers/updateOne";
import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { productId } = body;
    await updateOne(
      { "userOrder.productId": productId }, // filter
      { $pull: { userOrder: { productId: productId } } } // update
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
