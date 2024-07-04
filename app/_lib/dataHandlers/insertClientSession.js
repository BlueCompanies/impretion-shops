export default async function insertClientSession(generatedSessionId, shopRef) {
  try {
    const now = new Date();
    const colombianDate = new Date(now.getTime() - 5 * 60 * 60 * 1000); // Ajustar para UTC-5

    const day = colombianDate.getDate().toString().padStart(2, "0");
    const month = (colombianDate.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript son de 0 a 11
    const year = colombianDate.getFullYear();
    const hours = colombianDate.getHours().toString().padStart(2, "0");
    const minutes = colombianDate.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

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
            shopRef,
            userOrder: [],
            paymentTries: {
              cashPaymentTries: 3,
              onlinePaymentTries: 1,
            },
            createdAt: now,
            formatedCreatedAt: formattedDate,
            hasRequestedOrder: false,
          },
        }),
      }
    );

    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}
