"use client";

import findOne from "@/app/_lib/queries/findOne";
import insertOne from "@/app/_lib/queries/insertOne";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";
import { formatInTimeZone } from "date-fns-tz";

export default function SessionHandler({ shopRef }) {
  const clientSession = getCookie("clientSession");

  useEffect(() => {
    if (!clientSession) {
      (async () => {
        if (!hasCookie("clientSession")) {
          const uid = new ShortUniqueId({ length: 10 });
          const generatedSessionId = uid.rnd();

          const session = await findOne("temporal-client-session", {
            sessionId: generatedSessionId,
          });

          // if there is not session add it to the DB, then add the cookie
          if (!session) {
            try {
              const date = new Date();
              const formattedDate = formatInTimeZone(
                date,
                "America/Bogota",
                "dd/MM/yyyy HH:mm"
              );

              // Insert a new session into the DB
              const data = await insertOne("temporal-client-session", {
                sessionId: generatedSessionId,
                shopRef,
                userOrder: [],
                createdAt: new Date(),
                formattedCreatedSessionDate: formattedDate,
                hasRequestedOrder: false,
              });
              console.log("inserted session", data);
            } catch (error) {
              console.log(error);
            }
          }

          setCookie("clientSession", generatedSessionId);
        }
      })();
    }
  }, [clientSession, shopRef]);

  return null;
}
