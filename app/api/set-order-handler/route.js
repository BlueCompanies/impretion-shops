import insertOne from "@/app/_lib/queries/insertOne";
import updateOne from "@/app/_lib/queries/updateOne";
import { formatInTimeZone } from "date-fns-tz";
import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";

// set runtime to Edge
export const runtime = "edge";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { userData, userContactNumber } = body;

    const uid = new ShortUniqueId({ length: 10 });
    const orderId = uid.rnd();

    const date = new Date();
    const formattedDate = formatInTimeZone(
      date,
      "America/Bogota",
      "dd/MM/yyyy HH:mm"
    );

    // Inserts a new order
    await insertOne("orders", {
      userData,
      orderId,
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
