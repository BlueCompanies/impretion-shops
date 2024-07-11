import awsS3 from "@/app/_lib/aws/awsS3";
import deleteOne from "@/app/_lib/dataHandlers/deleteOne";
import insertOne from "@/app/_lib/dataHandlers/insertOne";
import updateOne from "@/app/_lib/dataHandlers/updateOne";
import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// set runtime to Edge
export const runtime = "edge";

const now = new Date();
const colombianDate = new Date(now.getTime() - 5 * 60 * 60 * 1000); // Ajustar para UTC-5

const day = colombianDate.getDate().toString().padStart(2, "0");
const month = (colombianDate.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
const year = colombianDate.getFullYear();
const hours = colombianDate.getHours().toString().padStart(2, "0");
const minutes = colombianDate.getMinutes().toString().padStart(2, "0");

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { userData, userContactNumber } = body;

    // Inserts a new order
    await insertOne("orders", {
      userData,
      contactData: { telephone: userContactNumber },
      orderStatus: "UNPROCESSED",
      createdAt: Date.now(),
      formattedOrderDate: formattedDate,
    });

    // hasRequestedOrder is set to "true" so the is it possible to identify the users that already ordered.
    await updateOne(
      "temporal-client-session",
      { sessionId: userData.sessionId },
      { $set: { hasRequestedOrder: true } }
    );

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 404 });
  }
}

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
