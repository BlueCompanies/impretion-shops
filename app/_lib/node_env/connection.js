export const connection =
  process.env.NODE_ENV === "development"
    ? {
        URI: "https://sa-east-1.aws.data.mongodb-api.com/app/impretion-shops-test-aifnohn/endpoint/data/v1",
        userAPI:
          "zMoYEh7witpypwa3B6RRPIjOGFpcG0YIjOEdQAX0cG864GWcF4Oo5aNWx8uDPDcx",
      }
    : {
        URI: "https://sa-east-1.aws.data.mongodb-api.com/app/data-lqpho/endpoint/data/v1",
        userAPI:
          "n5cPXyDjcNm37mcCb4mrfVPebcMSurv1dB1vJcNcAv6kaqDeQq4W0ZGGHQJTAAi1",
      };
