"use server";

export default async function insertOne(collection, body) {
  const devMode = process.env.NEXT_PUBLIC_CURRENT_ENV;
  const API_KEY = process.env.HTTP_ENDPOINTS_API_KEY;

  try {
    const document = {
      ...body,
      ...(devMode === "development" && { isInDevelopment: true }), // Conditionally add the property
    };

    // If development as devMode add in test/db collection (this is a temporal solution for development)
    const databaseEnv =
      devMode === "development" ? `impretion-shops-test` : "impretion-shops";

    const response = await fetch(
      `https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/insertOne`,
      {
        method: "POST",
        headers: {
          apiKey: API_KEY,
          "content-type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          dataSource: "Impretion",
          database: databaseEnv,
          collection,
          document,
        }),
      }
    );

    const responseData = await response.json();

    console.log(responseData, "RESPONSEDATA");

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
