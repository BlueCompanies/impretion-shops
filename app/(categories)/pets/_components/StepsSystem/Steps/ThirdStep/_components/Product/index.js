import Image from "next/image";
import SelectedProduct from "@/app/(categories)/pets/_components/StepsSystem/Steps/ThirdStep/_components/SelectedProduct";

export default function Product({
  productData,
  data,
  setExtraParam,
  extraParam,
  productUIType,
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
            src={productData?.imageUrl}
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
          />
        </div>
      </div>
    </>
  );
}
