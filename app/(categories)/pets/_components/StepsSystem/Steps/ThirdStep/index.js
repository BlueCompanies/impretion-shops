import Link from "next/link";
import StepsHandlerBtns from "../../StepsHandlerBtns";
import Product from "./_components/Product";
import styles from "./styles.module.css";

export default function ThirdStep({
  petData,
  setOrderData,
  orderData,
  extraParam,
  setExtraParam,
}) {
  return (
    <>
      <div
        style={{
          background: "#fff",
          overflowY: "auto", // Apply overflow-y: auto to the blue div only
          border: "1px solid #dedede",
          borderRadius: "4px",
          backgroundColor: "#dedede",
        }}
      >
        {/* UIType prop allows to show determinated UI depending on the product => 1 (none) | 2 (color changer) | 3 ¿? */}
        <Product
          selectedProduct={"mug"}
          productPSDFile={"test.psd"}
          productURL={"mug"}
          productImageUrl={
            "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fmug(v2).png"
          }
          productImagePlaceholder={
            "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fimpretion-shops_products-placeholder_mug-placeholder.webp"
          }
          productName={"Taza de cerámica 325 ml"}
          productPrice={"15.500 COP"}
          petData={petData}
          setOrderData={setOrderData}
          orderData={orderData}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
          productUIType={1}
        ></Product>

        <Product
          selectedProduct={"mug-colorido"}
          productPSDFile={"https://xyzstorage.store/a.psd"}
          productURL={"colored-mug"}
          productImageUrl={
            "https://xyzstorage.store/products%2Fmugs%2F66512ac2258a35db2bf5788f%2Fimages%2Fcolored-mug.webp"
          }
          productImagePlaceholder={
            "https://xyzstorage.store/products%2Fmugs%2F66512ac2258a35db2bf5788f%2Fimages%2Fcolored-mug-placeholder%20.webp"
          }
          productName={"Tazas de cerámicas coloridas 325 ml"}
          productPrice={"18.500 COP"}
          petData={petData}
          setOrderData={setOrderData}
          orderData={orderData}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
          productUIType={2}
        ></Product>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Link href={"http://localhost:3000?shopRef=rNGfsGUXaJ5gqctXyDX5VB"}>
          <p
            style={{
              background: "var(--main-color)",
              border: "none",
              outline: "none",
              padding: "10px",
              borderRadius: "4px",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            Volver a la pagina principal
          </p>
        </Link>
        <div className={styles.verticalSeparator}></div>
      </div>
    </>
  );
}
