import Link from "next/link";
import styles from "./styles.module.css";
import Product from "./_components/Product";

export default function SecondStep({ data, setExtraParam, extraParam }) {
  return (
    <div style={{ border: "1px solid #dedede", padding: "10px" }}>
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
            background: "#5271FF",
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
          <p style={{ fontWeight: 700 }}>PASO 2: PERSONALIZACIÓN</p>
          <p style={{ fontSize: "13px" }}>
            La imagen y el nombre que pongas se verán reflejados en el producto
            que elijas.
          </p>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          overflowY: "auto", // Apply overflow-y: auto to the blue div only
          border: "1px solid #dedede",
          borderRadius: "4px",
          backgroundColor: "#dedede",
        }}
      >
        <Product
          productData={{
            productRawName: "mug",
            productFullName: "Taza de cerámica 325 ml",
            productPrice: 16000,
            productImageUrl:
              "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fmug(v2).png",
            productImagePlaceholder:
              "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fimpretion-shops_products-placeholder_mug-placeholder.webp",
          }}
          productUIType={1}
          data={data}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
        ></Product>

        <Product
          productData={{
            productRawName: "colored-mug",
            productFullName: "Taza de cerámica colorida 325 ml",
            productPrice: 18000,
            productImageUrl:
              "https://xyzstorage.store/products%2Fmugs%2F66512ac2258a35db2bf5788f%2Fimages%2Fcolored-mug.webp",
            productImagePlaceholder:
              "https://xyzstorage.store/products%2Fmugs%2F66512ac2258a35db2bf5788f%2Fimages%2Fcolored-mug-placeholder%20.webp",
          }}
          productUIType={2}
          data={data}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
        ></Product>

        <Product
          productData={{
            productRawName: "magic-mug",
            productFullName: "Taza de mágica 325 ml",
            productPrice: 22000,
            productImageUrl:
              "https://xyzstorage.store/products%2Fmugs%2F652e32dfbcfee2bb108da386%2Fpreviews%2Fmagicmug.webp",
            productImagePlaceholder:
              "https://xyzstorage.store/products%2Fmugs%2F652e32dfbcfee2bb108da386%2Fpreviews%2Fmagicmug-placeholder.webp",
          }}
          productUIType={1}
          data={data}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
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
    </div>
  );
}
