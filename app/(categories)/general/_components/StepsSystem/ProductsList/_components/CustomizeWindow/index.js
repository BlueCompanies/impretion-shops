import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import fathersDesigns from "@/app/_lib/designs/fathersDesigns.json";
import Image from "next/image";
import ProductViewFullScreen from "@/app/(categories)/pets/_components/StepsSystem/Steps/ThirdStep/_components/ProductViewFullScreen";
import ProductExtraFunctionalities from "@/app/(categories)/_components/ProductExtraFunctionalities";
import AddProductToOrder from "@/app/(categories)/_components/AddProductToOrder";
import UserInfo from "../../../UserInfo";

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
  setUserData,
  userData,
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
          <UserInfo setUserData={setUserData} userData={userData} />
          <div
            style={{
              margin: "10px",
              border: "1px solid #dedede",
              padding: "10px",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  minWidth: "50px",
                  minHeight: "50px",
                  borderRadius: "50%",
                  background: "#8C52FF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "#fff",
                }}
              >
                2
              </div>
              <div style={{ marginLeft: "10px" }}>
                <p style={{ fontWeight: 700 }}>PASO 2: SELECCIONA UN DISEÑO</p>
                <p style={{ fontSize: "13px" }}>
                  Selecciona el diseño que te guste, la imagen y el nombre se
                  reflejarán en él.
                </p>
              </div>
            </div>
            <FieldDescription>
              Agrega cuantos productos con diferentes diseños quieras a la
              orden, puedes remover un producto de la orden cuando desees.
            </FieldDescription>

            <p
              style={{
                fontSize: "15px",
                marginLeft: "10px",
                fontWeight: "700",
              }}
            >
              {productData?.productFullName}
            </p>

            <div
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <ProductViewFullScreen blobImageUrl={blobImageUrl} />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "sticky",
                }}
              >
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
                      zIndex: -1,
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
                  style={{ position: "relative", zIndex: -2 }}
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
                width: "100%",
                border: "1px solid #dedede",
                padding: "5px",
                borderRadius: "4px 4px 0px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#55555" }}>Selecciona un diseño</p>
            </div>
            <div
              style={{
                border: "1px solid #dedede",
                height: "350px",
                borderRadius: "0px 0px 4px 4px",
                padding: "10px",
                overflowY: "auto",
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
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
                onClick={() => assignDesingToProductHandler("no-design")}
              >
                <p style={{ fontWeight: 700 }}>¿No te gusto ningun diseño?</p>
                <p>¡te haremos uno que se ajuste a tus gustos!</p>
              </div>
              <div style={{ width: "100%", height: "400px" }}>
                <div style={{ position: "relative" }}>
                  {fathersDesigns.map((design, index) => (
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
          </div>

          <div style={{ height: "40px", width: "100%" }}></div>
          <div
            style={{
              width: "100%",
            }}
          ></div>

          <div
            style={{
              position: "fixed",
              bottom: 1,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              height: "50px",
            }}
          >
            <button
              onClick={closeCustomizeWindow}
              style={{
                width: "100%",
                display: "flex",
                border: "none",
                outline: "none",
                background: "#8C52FF",
                color: "#fff",
                boxSizing: "border-box",
                alignItems: "center",
              }}
            >
              <Image
                src={"/icons/modals-and-messages/back-arrow.svg"}
                width={80}
                height={50}
                style={{ margin: "5px" }}
                quality={40}
              ></Image>
              <div
                style={{
                  marginRight: "5px",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></div>
              <p>Volver</p>
            </button>
            <AddProductToOrder
              productData={productData}
              blobImageUrl={blobImageUrl}
              data={data}
            />
          </div>
        </div>
      )}
    </>
  );
}
