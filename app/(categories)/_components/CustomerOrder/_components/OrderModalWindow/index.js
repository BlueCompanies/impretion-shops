"use client";
import { useEffect, useState } from "react";
import FieldDescription from "../../../FieldDescription";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";

export default function OrderModalWindow({ clientSession }) {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [isDeletingLoader, setIsDeletingLoader] = useState(false);
  const [currentProductIdDeleted, setCurrentProductIdDeleted] = useState("");
  const [userContactNumber, setUserContactNumber] = useState(0);
  const [newOrderModal, setNewOrderModal] = useState({
    isLoading: false,
    message: "",
  });

  useEffect(() => {
    const clientSession = getCookie("clientSession");
    if (showOrderModal && clientSession) {
      fetch("/api/get-order-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientSession }),
      }).then(async (res) => {
        const data = await res.json();
        console.log("ptm: ", data);
        setUserData(data);
      });
    }
  }, [showOrderModal]);

  const orderHandler = async () => {
    if (userData?.userOrder?.length > 0) {
      const clientSession = getCookie("clientSession");
      if (!clientSession) {
        setSessionExpired(true);
        return;
      }
      setNewOrderModal({
        isLoading: true,
        message: "Realizando orden...",
      });

      // orderData contains user's session/extra data
      const response = await fetch("/api/set-order-handler", {
        method: "POST",
        headers: { ContentType: "application/json" },
        body: JSON.stringify({ userData, userContactNumber }),
      });

      if (response.status === 200) {
        setNewOrderModal({
          isLoading: true,
          message: (
            <div style={{ width: "90%" }}>
              <p>
                ¡Tu pedido ha sido realizado con éxito! Recuerda que, si tienes
                alguna duda, puedes comunicarte al número:{" "}
              </p>
              <p
                style={{
                  textDecoration: "underline",
                  color: "var(--main-color)",
                }}
              >
                321 8987698
              </p>
              <p style={{ marginTop: "15px" }}>
                Si deseas realizar otro pedido, por favor, recarga la página.
              </p>
            </div>
          ),
        });
        deleteCookie("clientSession");
        setUserData([]);
      }
    }
  };

  const deleteProductHandler = async (productId, index) => {
    setCurrentProductIdDeleted(productId);
    setIsDeletingLoader(true);
    const response = await fetch("/api/delete-product-handler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (response.status === 200) {
      // Make a copy of the current userData
      const updatedUserData = { ...userData };

      // Remove the item at the specified index from the userOrder array
      updatedUserData.userOrder.splice(index, 1);

      // Update the state with the modified userData
      setUserData(updatedUserData);
    } else {
      alert("Ha ocurrido un error.");
    }
    setIsDeletingLoader(false);
  };

  // Calculate total price
  const totalPrice =
    userData?.userOrder?.reduce(
      (total, order) => total + parseFloat(order.data.productPrice),
      0
    ) || 0;

  return (
    <>
      {sessionExpired && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(255, 255, 255, 0.9)",
            zIndex: 99999999999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "15px",
              color: "#333",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p>
              La session ha expirado!, ya haz realizado tu orden, si deseas
              realizar otro pedido, recarga la pagina o comunicate al 314
            </p>
          </div>
        </div>
      )}

      {/* New order UI handler */}
      {newOrderModal.isLoading && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: "100vh",
              width: "100vw",
              background: "rgba(255, 255, 255, 0.9)",
              zIndex: 99999999999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                color: "#333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {newOrderModal.message}
            </div>
          </div>
        </>
      )}
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
              {userData?.userOrder?.length > 0 ? (
                userData?.userOrder?.map((product, index) => (
                  <div
                    key={product.productId}
                    style={{
                      border: "1px solid #dedede",
                      padding: "5px",
                      borderRadius: "5px",
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    <Image
                      src={product.data.productMockupPreview}
                      width={100}
                      height={100}
                      alt={product.data.productFullName}
                      quality={1}
                    />
                    <div
                      style={{
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      <p style={{ fontWeight: 700, fontSize: "14px" }}>
                        {product.data.productFullName}
                      </p>
                      <p>{product.data.productPrice} COP</p>
                      <button
                        style={{
                          width: "100px",
                          height: "30px",
                          marginTop: "5px",
                          border: "none",
                          outline: "none",
                          background: "var(--main-color)",
                          borderRadius: "4px",
                          color: "#fff",
                        }}
                        onClick={() =>
                          deleteProductHandler(product.productId, index)
                        }
                      >
                        {isDeletingLoader &&
                        currentProductIdDeleted === product.productId ? (
                          <p>Eliminando...</p>
                        ) : (
                          <p>Eliminar</p>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    height: "400px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ fontWeight: 700 }}>No hay productos</p>
                  <Image
                    src={"/images/placeholder-images/empty-shop-cart.svg"}
                    width={300}
                    height={300}
                  ></Image>
                  <p style={{ fontSize: "12px", textAlign: "center" }}>
                    No tienes productos en tu carrito de compras, selecciona,
                    personaliza y agrega algún producto a tu carrito de compras.
                  </p>
                </div>
              )}
            </div>

            {userData?.userOrder && userData?.userOrder?.length > 0 ? (
              <>
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
                <div style={{ marginTop: "10px" }}>
                  <label>
                    Número de teléfono de contacto:
                    <input
                      type="number"
                      style={{
                        outline: "none",
                        border: "1px solid var(--main-color)",
                        width: "100%",
                        height: "30px",
                        fontSize: "17px",
                        borderRadius: "4px",
                        padding: "5px",
                        color: "#555",
                      }}
                      placeholder="Número de contacto"
                      onChange={(e) => setUserContactNumber(e.target.value)}
                    ></input>
                  </label>
                </div>
                <button
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    background:
                      userContactNumber.length > 3 ? "#8c52ff" : "#C4A6FF",
                    outline: "none",
                    border: "none",
                    padding: "10px",
                    borderRadius: "4px",
                    color: "#fff",
                  }}
                  onClick={orderHandler}
                  disabled={userContactNumber.length > 3 ? false : true}
                >
                  Realizar pedido
                </button>
              </>
            ) : (
              <>
                <button
                  style={{
                    display: "flex",
                    marginTop: "10px",
                    width: "100%",
                    justifyContent: "center",
                    padding: "6px",
                    border: "none",
                    outline: "none",
                    borderRadius: "4px",
                    background: "var(--main-color)",
                    color: "#fff",
                  }}
                  onClick={() => setShowOrderModal(false)}
                >
                  Volver
                </button>
              </>
            )}

            <FieldDescription marginTop={"10px"}>
              Nos pondremos en contacto contigo para organizar el envío y
              acordar el pago de los productos.
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
        {userData?.userOrder?.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 1,
              background: "red",
              padding: "4px",
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: "translateY(-6px)",
            }}
          >
            <p>{userData?.userOrder?.length}</p>
          </div>
        )}
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
