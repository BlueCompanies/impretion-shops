"use server";
export default async function deleteOne(collection, filter) {
  try {
    const response = await fetch(
      "https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1/action/deleteOne",
      {
        method: "POST",
        headers: {
          apiKey:
            "n5cPXyDjcNm37mcCb4mrfVPebcMSurv1dB1vJcNcAv6kaqDeQq4W0ZGGHQJTAAi1",
          "content-type": "application/json", // Add content-type header
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          dataSource: "Impretion",
          database: "impretion-shops",
          collection,
          filter,
        }),
      }
    );

    const data = await response.json();
    const { document } = data;
    console.log(document);
    return document;
  } catch (error) {
    console.log(error);
  }
}
