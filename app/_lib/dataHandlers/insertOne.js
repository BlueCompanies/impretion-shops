"use server";

export default async function insertOne(collectionName, body) {
  const devMode = process.env.CURRENT_ENV;
  try {
    const document = {
      ...body,
      ...(devMode === "development" && { isInDevelopment: true }), // Conditionally add the property
    };

    // If development as devMode add in test collection (this is a temporal solution for development)
    const finalCollectionName =
      devMode === "development" ? `${collectionName}-test` : collectionName;

    const response = await fetch(
      `https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/insertOne`,
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
          collection: finalCollectionName,
          document,
        }),
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      return responseData;
    } else {
      return {
        status: response.status,
        message: responseData.error || "Error inserting document",
      };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message }; // Returning an error status code with the error message
  }
}
