"use client";

import awsS3 from "@/app/_lib/aws/awsS3";
import ShortUniqueId from "short-unique-id";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getCookie } from "cookies-next";
import { useState } from "react";
import NewAddedProductModal from "./_components/NewAddedProductModal";

export default function AddProductToOrder({ productData, data, blobImage }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addedProductImage, setAddedProductImage] = useState("");

  const newProductHandler = async () => {
    if (!blobImage) return;
    setShowModal(true);
    setLoading(true);

    const clientSession = getCookie("clientSession");
    const uid = new ShortUniqueId({ length: 10 });
    const generatedId = uid.rnd();
    //const arrayBuffer = await newImageUrl.arrayBuffer();

    // Convertig rawBlobImage into an arrayBuffer to be uploaded to S3
    const arrayBuffer = await new Response(blobImage).arrayBuffer();

    // Create the PutObjectCommand
    let command = new PutObjectCommand({
      Bucket: "impretion",
      Key: `impretion-shops/user-temp-sessions-files/${clientSession}/orders/${generatedId}.png`,
      Body: arrayBuffer,
    });

    // Upload the image to S3
    await awsS3()
      .send(command)
      .then((res) => {
        if (res.$metadata.httpStatusCode === 200) {
          setAddedProductImage(
            `https://xyzstorage.store/impretion-shops/user-temp-sessions-files/${clientSession}/orders/${generatedId}.png`
          );
        }
      });

    // Set order, save it on DB
    const newProduct = await fetch("/api/new-product", {
      method: "POST",
      headers: { contentType: "application/json" },
      body: JSON.stringify({
        clientSession,
        generatedId,
        data: {
          data,
          productRawName: productData?.productRawName,
          productFullName: productData?.productFullName,
          productPrice: productData?.productPrice,
          productMockupPreview: `https://xyzstorage.store/impretion-shops/user-temp-sessions-files/${clientSession}/orders/${generatedId}.png`,
        },
      }),
    });

    if (newProduct.status === 200) {
      setLoading(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {showModal && (
        <NewAddedProductModal
          loading={loading}
          error={error}
          setShowModal={setShowModal}
          addedProductImage={addedProductImage}
        />
      )}
      <div
        style={{ display: "flex", padding: "10px" }}
        onClick={newProductHandler}
      >
        <div
          style={{
            minWidth: "30px",
            minHeight: "30px",
            background: blobImage ? "#00EA9D" : "#dedede",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px 0px 0px 4px",
            flexDirection: "column",
            border: blobImage ? "1px solid green" : "1px solid #5555",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: blobImage ? "green" : "#5555",
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
            border: blobImage ? "1px solid green" : "1px solid #5555",
            background: blobImage ? "#00EA9D" : "#dedede",
            color: blobImage ? "green" : "#5555",
            fontWeight: 700,
          }}
        >
          <p>Agregar a la orden</p>
        </div>
      </div>
    </>
  );
}
