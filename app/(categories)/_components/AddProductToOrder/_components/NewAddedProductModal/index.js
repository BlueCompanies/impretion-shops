import Image from "next/image";
import FieldDescription from "../../../FieldDescription";

export default function NewAddedProductModal({
  loading,
  error,
  setShowModal,
  addedProductImage,
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        width: "100vw",
        background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        backdropFilter: "blur(5px)", // Blurry effect
        zIndex: 1000, // Ensure it's on top
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          minHeight: "60%",
          width: "90%",
          borderRadius: "8px", // Optional: rounded corners
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: shadow for better visibility
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Add any content you want inside the modal */}
        <div>
          {loading ? (
            <>Agregando producto al carrito de compras...</>
          ) : error ? (
            `Error: ${error}`
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "90%", marginTop: "10px" }}>
                    <FieldDescription>
                      Puedes ver tu carrito de compras en la esquina inferior
                      derecha al dar click en "volver".
                    </FieldDescription>
                  </div>
                  <p style={{ fontSize: "11px" }}>
                    Producto agregado con éxito!
                  </p>
                </div>
              </div>
              <Image
                src={addedProductImage}
                width={200}
                height={200}
                style={{ marginTop: "30px" }}
                quality={10}
              ></Image>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  bottom: 2,
                  height: "30px",
                  border: "none",
                  outline: "none",
                  borderRadius: "0px 0px 6px 6px",
                  margin: "5px",
                  width: "95%",
                  background: "#8c52ff",
                  color: "#fff",
                }}
              >
                Aceptar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
