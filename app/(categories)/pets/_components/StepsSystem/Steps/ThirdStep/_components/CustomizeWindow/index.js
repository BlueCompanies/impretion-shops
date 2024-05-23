import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import dogDesigns from "@/app/_lib/designs/dogDesigns.json";
import Image from "next/image";
import ProductViewFullScreen from "../ProductViewFullScreen";

export default function CustomizeWindow({
  isCustomizing,
  newImageUrl,
  closeCustomizeWindow,
  assignDesingToProductHandler,
  productName,
}) {
  return (
    <>
      {isCustomizing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            background: "#fff",
            zIndex: 99999999999,
            overflow: "auto",
          }}
        >
          <div style={{ margin: "10px" }}>
            <FieldDescription>
              Agrega cuantos productos con diferentes diseños quieras a la
              orden, puedes remover un producto de la orden cuando desees.
            </FieldDescription>
          </div>
          <p
            style={{ fontSize: "15px", marginLeft: "10px", fontWeight: "700" }}
          >
            {productName}
          </p>
          <div style={{ display: "flex", padding: "10px" }}>
            <div
              style={{
                minWidth: "30px",
                minHeight: "30px",
                background: "#00EA9D",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px 0px 0px 4px",
                flexDirection: "column",
                border: "1px solid green",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                }}
              >
                +
              </p>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid green",
                background: "#00EA9D",
              }}
            >
              <p>Agregar a la orden</p>
            </div>
          </div>

          <div
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <ProductViewFullScreen newImageUrl={newImageUrl} />
            <Image
              src={
                newImageUrl ||
                "https://xyzstorage.store/impretion-shops%2Fproducts-placeholder%2Fmug-placeholder.png"
              }
              width={250}
              height={250}
            ></Image>
          </div>

          <div
            style={{
              border: "1px solid #dedede",
              height: "55%",
              borderRadius: "4px",
              padding: "10px",
              margin: "10px",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100px",
                border: "1px dashed #555555",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#555555",
                flexDirection: "column",
                fontSize: "12px",
                background: "#E8E8E8",
              }}
            >
              <p style={{ fontWeight: 700 }}>¿No te gusto ningun diseño?</p>
              <p>¡te haremos uno que se ajuste a tus gustos!</p>
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <div>
                {dogDesigns.dogDesigns.map((design, index) => (
                  <img
                    src={design.designUrl}
                    onClick={() =>
                      assignDesingToProductHandler(design.designId)
                    }
                    style={{
                      width: "100%",
                      height: "135px",
                      marginTop: "3px",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                    key={index}
                  ></img>
                ))}
              </div>
            </div>
          </div>
          <div style={{ height: "40px", width: "100%" }}></div>

          <div
            style={{
              position: "fixed",
              bottom: 1,
              width: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            ></div>
            <div style={{ display: "flex" }}>
              <button
                onClick={closeCustomizeWindow}
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  margin: "auto",
                  justifyContent: "center",
                  border: "none",
                  outline: "none",
                  background: "#8C52FF",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    marginRight: "15px",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></div>
                <p>Volver</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
