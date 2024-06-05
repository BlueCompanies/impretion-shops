"use client";
import { getCookie } from "cookies-next";
import OrderModalWindow from "./_components/OrderModalWindow";

export default function CustomerOrder() {
  const clientSession = getCookie("clientSession");

  return <OrderModalWindow clientSession={clientSession} />;
}
