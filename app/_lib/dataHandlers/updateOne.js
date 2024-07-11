"use server";

export default async function updateOne(collection, filter, update) {
  try {
    const response = await fetch(
      "https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/updateOne",
      {
        method: "POST",
        headers: {
          apiKey:
            "n5cPXyDjcNm37mcCb4mrfVPebcMSurv1dB1vJcNcAv6kaqDeQq4W0ZGGHQJTAAi1",
          "content-type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          dataSource: "Impretion",
          database: "impretion-shops",
          collection,
          filter,
          update,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API response error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error in updateOne:", error.message);
    throw error;
  }
}
