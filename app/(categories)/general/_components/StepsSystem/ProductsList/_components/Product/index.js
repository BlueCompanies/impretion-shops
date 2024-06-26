import Image from "next/image";
import SelectedProduct from "../SelectedProduct";

export default function Product({
  productData,
  data,
  setExtraParam,
  extraParam,
  productUIType,
  setUserData,
  userData,
  psdDesigns,
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
            src={productData?.productImageUrl}
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
          <p style={{ fontSize: "13px" }}>{productData?.productFullName}</p>

          <p style={{ margin: "5px" }}>{productData?.productPrice} COP</p>
          <SelectedProduct
            productData={productData}
            data={data}
            setExtraParam={setExtraParam}
            extraParam={extraParam}
            productUIType={productUIType}
            setUserData={setUserData}
            userData={userData}
            psdDesigns={psdDesigns}
          />
        </div>
      </div>
    </>
  );
}
