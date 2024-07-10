"use server";

export default async function insertOne(collection, body) {
  const devMode = process.env.CURRENT_ENV;
  try {
    const document = {
      ...body,
      ...(devMode === "development" && { isInDevelopment: true }), // Conditionally add the property
    };
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
          collection,
          document,
        }),
      }
    );
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      return response.status;
    } else {
      return 400;
    }
  } catch (error) {
    console.log(error);
    return 500; // Returning an error status code
  }
}
