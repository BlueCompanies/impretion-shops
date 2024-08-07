import { Inter } from "next/font/google";
import "./globals.css";
import CustomerOrder from "./(categories)/_components/CustomerOrder";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Impretion shops",
  description: "Personaliza tus productos en unos cuantos clicks!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ minWidth: "50%", position: "relative" }}>
          <Suspense>
            <CustomerOrder />
          </Suspense>

          {children}
        </div>
      </body>
    </html>
  );
}
