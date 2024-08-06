import Link from "next/link";
import styles from "./styles.module.css";
import Product from "./_components/Product";

export default function ProductsList({
  data,
  setExtraParam,
  extraParam,
  setUserData,
  userData,
}) {
  return (
    <div style={{ border: "1px solid #dedede", padding: "10px" }}>
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
            rawName: "mug",
            fullName: "Taza de cerámica 325 ml",
            priceData: { salePrice: 17000, basePrice: 3500, profit: 13500 },
            imageUrl:
              "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fmug(v2).png",
            imagePlaceholder:
              "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fimpretion-shops_products-placeholder_mug-placeholder.webp",
          }}
          productUIType={1}
          data={data}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
          setUserData={setUserData}
          userData={userData}
          psdDesigns={"general"}
        ></Product>

        <Product
          productData={{
            rawName: "colored-mug",
            fullName: "Taza de cerámica colorida 325 ml",
            priceData: { salePrice: 19000, basePrice: 5500, profit: 13500 },
            imageUrl:
              "https://xyzstorage.store/products%2Fmugs%2F66512ac2258a35db2bf5788f%2Fimages%2Fcolored-mug.webp",
            imagePlaceholder:
              "https://xyzstorage.store/products%2Fmugs%2F66512ac2258a35db2bf5788f%2Fimages%2Fcolored-mug-placeholder%20.webp",
          }}
          productUIType={2}
          data={data}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
          setUserData={setUserData}
          userData={userData}
          psdDesigns={"general"}
        ></Product>

        <Product
          productData={{
            rawName: "magic-mug",
            fullName: "Taza de mágica 325 ml",
            priceData: { salePrice: 23000, basePrice: 7000, profit: 16000 },
            imageUrl:
              "https://xyzstorage.store/products%2Fmugs%2F652e32dfbcfee2bb108da386%2Fpreviews%2Fmagicmug.webp",
            imagePlaceholder:
              "https://xyzstorage.store/products%2Fmugs%2F652e32dfbcfee2bb108da386%2Fpreviews%2Fmagicmug-placeholder.webp",
          }}
          productUIType={1}
          data={data}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
          setUserData={setUserData}
          userData={userData}
          psdDesigns={"general"}
        ></Product>
      </div>
      {/*
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
       */}
    </div>
  );
}
