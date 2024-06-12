export default async function insertClientSession(generatedSessionId) {
  try {
    const now = new Date();
    const colombianDate = new Date(now.getTime() - 5 * 60 * 60 * 1000); // Adjust for UTC-5

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
          collection: "temporal-client-session",
          document: {
            sessionId: generatedSessionId,
            userOrder: [],
            paymentTries: {
              cashPaymentTries: 3,
              onlinePaymentTries: 1,
            },
            createdAt: now,
            formatedCreatedAt: colombianDate,
            isOrderProcessed: false,
          },
        }),
      }
    );

    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
