"use client";

import { hasCookie, setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ShortUniqueId from "short-unique-id";

export default function SessionHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      if (!hasCookie("clientSession")) {
        const uid = new ShortUniqueId({ length: 10 });
        const generatedSessionId = uid.rnd();
        setCookie("clientSession", generatedSessionId);
        const shopRef = searchParams.get("shopRef");

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
      }
    })();
  }, [searchParams]);

  return null;
}
