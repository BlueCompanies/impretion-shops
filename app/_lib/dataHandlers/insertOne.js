"use server";

export default async function insertOne(collection, body) {
  try {
    const response = await fetch(
      "https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/insertOne",
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
          document: body,
        }),
      }
    );
    console.log(response.status);
    if (response.status === 201) {
      return 201;
    } else {
      return 400;
    }
  } catch (error) {
    console.log(error);
  }
}
