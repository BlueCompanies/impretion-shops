export default async function insertOrderData(clientSession, order) {
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
          collection: "temporal-client-session",
          filter: { sessionId: clientSession },
          update: {
            $push: {
              userOrder: order, // Add the new order ID to the userOrder array
            },
          },
        }),
      }
    );

    const data = await response.json();
  } catch (error) {
    console.log("Error updating document:", error);
  }
}
