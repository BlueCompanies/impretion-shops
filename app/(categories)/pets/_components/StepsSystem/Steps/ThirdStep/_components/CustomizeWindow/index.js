import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import dogDesigns from "@/app/_lib/designs/dogDesigns.json";
import catDesigns from "@/app/_lib/designs/catDesigns.json";
import Image from "next/image";
import ProductViewFullScreen from "@/app/(categories)/pets/_components/StepsSystem/Steps/ThirdStep/_components/ProductViewFullScreen";
import ProductExtraFunctionalities from "@/app/(categories)/_components/ProductExtraFunctionalities";
import AddProductToOrder from "@/app/(categories)/_components/AddProductToOrder";

export default function CustomizeWindow({
  productData,
  isCustomizing,
  blobImage,
  blobImageUrl,
  closeCustomizeWindow,
  assignDesingToProductHandler,
  loadingDesign,
  designId,
  extraParam,
  setExtraParam,
  productUIType,
  data,
}) {
  const petType = data.petType === "Perro" ? dogDesigns : catDesigns;

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
            {productData?.productFullName}
          </p>
          <AddProductToOrder
            blobImage={blobImage}
            data={data}
            productData={productData}
          />

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
            <ProductViewFullScreen blobImageUrl={blobImageUrl} />
            <div style={{ width: "250px", height: "250px" }}>
              {loadingDesign && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "11px", color: "#dedede" }}>
                      Cargando tu diseño...
                    </p>
                  </div>
                </div>
              )}
              <Image
                src={blobImageUrl || productData?.productImagePlaceholder}
                width={250}
                height={250}
              ></Image>
            </div>
          </div>
          <ProductExtraFunctionalities
            productUIType={productUIType}
            setExtraParam={setExtraParam}
            extraParam={extraParam}
            blobImageUrl={blobImageUrl}
          />

          <div
            style={{
              border: "1px solid #dedede",
              height: "55%",
              borderRadius: "4px",
              padding: "10px",
              margin: "10px",
              overflowY: "auto",
              position: "relative",
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
            <div style={{ width: "100%" }}>
              <div style={{ position: "relative" }}>
                {petType.map((design, index) => (
                  <img
                    src={design.designUrl}
                    onClick={() =>
                      designId !== design.designId &&
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
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            ></div>

            <button
              onClick={closeCustomizeWindow}
              style={{
                height: "40px",
                width: "50%",
                display: "flex",
                alignItems: "center",
                margin: "auto",
                justifyContent: "center",
                border: "none",
                outline: "none",
                background: "#8C52FF",
                color: "#fff",
                boxSizing: "border-box",
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
      )}
    </>
  );
}
