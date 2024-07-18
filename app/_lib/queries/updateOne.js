"use server";

export default async function updateOne(collection, filter, update) {
  const devMode = process.env.NEXT_PUBLIC_CURRENT_ENV;
  const API_KEY = process.env.HTTP_ENDPOINTS_API_KEY;

  // If development as devMode add in test/db collection (this is a temporal solution for development)
  const databaseEnv =
    devMode === "development" ? `impretion-shops-test` : "impretion-shops";

  try {
    const response = await fetch(
      "https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/updateOne",
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

    return { data, status: 200 };
  } catch (error) {
    console.log("Error in updateOne:", error.message);
    throw error;
  }
}
