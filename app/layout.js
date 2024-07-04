import { Inter } from "next/font/google";
import "./globals.css";
import SessionHandler from "./(categories)/_components/SessionHandler";
import CustomerOrder from "./(categories)/_components/CustomerOrder";
import { getCookie, getCookies } from "cookies-next";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Impretion shops",
  description: "Personaliza tus productos en unos cuantos clicks!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={inter.className}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ minWidth: "50%", position: "relative" }}>
          <Suspense fallback={"loading..."}>
            <SessionHandler />
          </Suspense>

          <CustomerOrder />

          {children}
        </div>
      </body>
    </html>
  );
}
