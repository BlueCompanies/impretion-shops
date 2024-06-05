"use client";
import { useEffect, useState } from "react";
import FieldDescription from "../../../FieldDescription";
import Image from "next/image";

export default function OrderModalWindow({ clientSession }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const { userOrder } = orderData;

  useEffect(() => {
    if (showOrderModal) {
      fetch("/api/get-order-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientSession }),
      }).then(async (res) => {
        const data = await res.json();
        console.log("ptmxxx: ", data);
        setOrderData(data);
      });
    }
  }, [showOrderModal]);

  // Calculate total price
  const totalPrice =
    userOrder?.reduce(
      (total, order) => total + parseFloat(order.data.productPrice),
      0
    ) || 0;

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
              {userOrder?.map((order) => (
                <div
                  key={order.id}
                  style={{
                    border: "1px solid #dedede",
                    padding: "5px",
                    borderRadius: "5px",
                    display: "flex",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={order.data.productMockupPreview}
                    style={{ width: "100px", height: "100px" }}
                    alt={order.data.productFullName}
                  />
                  <div style={{ flexDirection: "column", marginLeft: "10px" }}>
                    <p style={{ fontWeight: 700, fontSize: "14px" }}>
                      {order.data.productFullName}
                    </p>
                    <p>{order.data.productPrice} COP</p>
                  </div>
                </div>
              ))}
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
              Orden total: {totalPrice} COP
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
              onClick={() => {
                // Handle order submission logic
              }}
            >
              Realizar pedido
            </button>

            <FieldDescription marginTop={"10px"}>
              Recuerda que nos pondremos en contacto contigo para la realización
              del pago. El precio total es simplemente como referencia, no se
              efectuará ningún cobro al realizar la orden y puedes cancelar la
              orden en el momento que desees.
            </FieldDescription>
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          background: "#4D22A2",
          color: "#fff",
          margin: "10px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "1px 1px 6px #555",
        }}
        onClick={() => setShowOrderModal(true)}
      >
        <div style={{ display: "flex" }}>
          <Image
            src={"/icons/modals-and-messages/shop-cart-white.svg"}
            width={70}
            height={70}
            style={{ margin: "auto 0px" }}
            alt="Shopping Cart"
          />
        </div>
      </div>
    </>
  );
}
