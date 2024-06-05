"use client";
import { hasCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";

export default function SessionHandler() {
  useEffect(() => {
    (async () => {
      if (!hasCookie("clientSession")) {
        const uid = new ShortUniqueId({ length: 10 });
        const generatedSessionId = uid.rnd();
        setCookie("clientSession", generatedSessionId);

        await fetch("/api/new-client-session", {
          method: "POST",
          headers: {
            contentType: "application/json",
          },
          body: JSON.stringify({
            sessionId: generatedSessionId,
          }),
        });
      }
    })();
  }, []);
}
