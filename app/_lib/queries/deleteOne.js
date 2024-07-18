"use server";

export default async function deleteOne(collection, filter) {
  const devMode = process.env.NEXT_PUBLIC_CURRENT_ENV;
  const API_KEY = process.env.HTTP_ENDPOINTS_API_KEY;

  const databaseEnv =
    devMode === "development" ? `impretion-shops-test` : "impretion-shops";

  try {
    const response = await fetch(
      `https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/deleteOne`,
      {
        method: "POST",
        headers: {
          apiKey: API_KEY,
          "content-type": "application/json", // Add content-type header
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          dataSource: "Impretion",
          database: databaseEnv,
          collection,
          filter,
        }),
      }
    );

    const data = await response.json();
    const { document } = data;
    return document;
  } catch (error) {
    console.log(error);
  }
}
