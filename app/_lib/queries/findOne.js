"use server";

export default async function findOne(collection, filter) {
  const devMode = "production";
  const API_KEY = process.env.HTTP_ENDPOINTS_API_KEY;

  // If development as devMode add in test/db collection (this is a temporal solution for development)
  const databaseEnv =
    devMode === "development" ? "impretion-shops-test" : "impretion-shops";

  try {
    const response = await fetch(
      `https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/findOne`,
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
