import awsS3 from "@/app/_lib/aws/awsS3";
import deleteOne from "@/app/_lib/dataHandlers/deleteOne";
import insertOne from "@/app/_lib/dataHandlers/insertOne";
import updateOne from "@/app/_lib/dataHandlers/updateOne";
import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { userData, userContactNumber } = body;
    /*
    const { sessionId } = userData;
    const BUCKET_PREFIX = `impretion-shops/user-temp-sessions-files/${sessionId}/orders`;

    // Create the PutObjectCommand
    const listedObjectsCommand = new ListObjectsV2Command({
      Bucket: "impretion",
      Prefix: BUCKET_PREFIX,
    });

    // Update (push) every file on the user's session 'Delete: {Objects:[]}'
    const deleteObjectsParams = {
      Bucket: "impretion",
      Delete: { Objects: [] },
    };

    // Upload the image to S3
    const listedObjects = await awsS3().send(listedObjectsCommand);

    if (listedObjects.Contents.length <= 0) return;
    listedObjects.Contents.forEach(({ Key }) => {
      deleteObjectsParams.Delete.Objects.push({ Key });
    });

    const deleteObjectsCommand = new DeleteObjectsCommand(deleteObjectsParams);

    awsS3()
      .send(deleteObjectsCommand)
      .then(async () => {
        await deleteOne("temporal-client-session", {
          sessionId,
        });
      });
     */

    await insertOne("orders", {
      userData,
      userContactNumber,
      orderStatus: {
        orderProcessed: false,
      },
    });

    await updateOne(
      { sessionId: userData.sessionId },
      { $set: { isOrderProcessed: true } }
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}
