import Image from "next/image";
import SelectedProduct from "../SelectedProduct";

export default function Product({
  selectedProduct,
  productPSDFile,
  productURL,
  productImageUrl,
  productName,
  productPrice,
  petData,
  setOrderData,
  orderData,
}) {
  return (
    <>
      <div
        style={{
          border: "1px solid #fff",
          borderRadius: "4px",
          display: "flex",
          background: "#fff",
          margin: "5px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "4px 0px 0px 4px",
          }}
        >
          <Image
            width={100}
            height={100}
            objectFit="cover"
            src={productImageUrl}
          ></Image>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "13px" }}>{productName}</p>
          <p style={{ margin: "5px" }}>{productPrice}</p>
          <SelectedProduct
            selectedProduct={selectedProduct}
            productPSDFile={productPSDFile}
            productURL={productURL}
            productImageUrl={productImageUrl}
            productName={productName}
            petData={petData}
            setOrderData={setOrderData}
            orderData={orderData}
          />
        </div>
      </div>
    </>
  );
}
