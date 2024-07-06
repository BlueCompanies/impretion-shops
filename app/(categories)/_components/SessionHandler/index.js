"use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";

export default function SessionHandler({ shopRef }) {
  const clientSession = getCookie("clientSession");

  useEffect(() => {
    if (!clientSession) {
      (async () => {
        if (!hasCookie("clientSession")) {
          const uid = new ShortUniqueId({ length: 10 });
          const generatedSessionId = uid.rnd();

          await fetch("/api/new-client-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId: generatedSessionId,
              shopRef,
            }),
          });

          setCookie("clientSession", generatedSessionId);
        }
      })();
    }
  }, [clientSession, shopRef]);

  return null;
}
