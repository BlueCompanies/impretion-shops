"use client";

import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import Image from "next/image";
import { useState } from "react";

export default function CustomerOrder({ setCurrentStep }) {
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <>
      {showOrderModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100vh",
            width: "100vw",
            background: "#fff",
            zIndex: 1000, // Ensure it's on top
            padding: "20px",
            overflow: "auto",
          }}
        >
          <button
            onClick={() => setShowOrderModal(false)}
            style={{
              position: "absolute",
              background: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "25px",
              color: "#fff",
              backgroundColor: "#555555",
              height: "40px",
              width: "40px",
              borderRadius: "50%",
            }}
          >
            X
          </button>

          <div style={{ marginTop: "80px", height: "100%" }}>
            <h2>Tu orden</h2>
            <div
              style={{
                border: "1px solid #dedede",
                overflowY: "auto",
                borderRadius: "4px",
                padding: "10px",
                maxHeight: "60%",
              }}
            >
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
              <div>Producto</div>
            </div>
            <div
              style={{
                width: "100%",
                height: "40px",
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                padding: "5px",
                background: "#fff",
                boxShadow: "1px 1px 1px #dedede",
                borderRadius: "4px",
                border: "1px solid #dedede",
              }}
            >
              Orden total: 45.600 COP
            </div>
            <button
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#8c52ff",
                outline: "none",
                border: "none",
                padding: "10px",
                borderRadius: "4px",
                color: "#fff",
              }}
              onClick={
                () =>
                  "" /* Current step a 4, luego de pasar las modales correspondientes. */
              }
            >
              Realizar perdido
            </button>

            <FieldDescription marginTop={"10px"}>
              Recuerda que nos pondremos en contacto contigo para la realizacion
              del pago. El precio total es simplemente como referencia, no se
              efectuara ningun cobro al realizar la orden y puedes cancelar la
              orden en el momento que desees.
            </FieldDescription>
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          left: "0px",
          right: "0px",
          background: "#8c52ff",
          color: "#fff",
          width: "100%",
          margin: "0", // Ensure no margin
          padding: "10px", // Adjust padding as needed
        }}
      >
        <button
          onClick={() => setShowOrderModal(true)}
          style={{
            width: "100%", // Make the button span the entire width of the parent div
            background: "#fff", // Make button background transparent to match parent
            border: "none", // Remove button border
            color: "var(--main-color)", // Inherit text color from parent
            fontSize: "inherit", // Inherit font size from parent
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={"/icons/modals-and-messages/shop-cart.svg"}
            width={35}
            height={35}
          ></Image>
          <span>Mira tu orden aquí</span>
        </button>
      </div>
    </>
  );
}
