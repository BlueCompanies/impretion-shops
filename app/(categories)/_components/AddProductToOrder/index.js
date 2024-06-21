"use client";

import awsS3 from "@/app/_lib/aws/awsS3";
import ShortUniqueId from "short-unique-id";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getCookie } from "cookies-next";
import { useState } from "react";
import NewAddedProductModal from "./_components/NewAddedProductModal";
import Image from "next/image";

export default function AddProductToOrder({ productData, data, blobImageUrl }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addedProductImage, setAddedProductImage] = useState("");

  const newProductHandler = async () => {
    if (!blobImageUrl) return;
    setShowModal(true);
    setLoading(true);

    const clientSession = getCookie("clientSession");
    const uid = new ShortUniqueId({ length: 10 });
    const generatedId = uid.rnd();
    //const arrayBuffer = await newImageUrl.arrayBuffer();

    // Convertig rawBlobImage into an arrayBuffer to be uploaded to S3
    const arrayBuffer = await new Response(blobImageUrl).arrayBuffer();

    let url = blobImageUrl.substring("https://xyzstorage.store".length);

    // Create the PutObjectCommand
    let command = new PutObjectCommand({
      Bucket: "impretion",
      Key: url,
      Body: arrayBuffer,
    });

    // Upload the image to S3
    await awsS3()
      .send(command)
      .then((res) => {
        if (res.$metadata.httpStatusCode === 200) {
          setAddedProductImage(blobImageUrl);
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
          productUserData: data,
          productRawName: productData?.productRawName,
          productFullName: productData?.productFullName,
          productPrice: productData?.productPrice,
          productMockupPreview: blobImageUrl,
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
        style={{ display: "flex", width: "100%" }}
        onClick={newProductHandler}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: blobImageUrl ? "1px solid green" : "1px solid #5555",
            background: blobImageUrl ? "#00EF7C" : "#dedede",
            color: blobImageUrl ? "green" : "#555555",
          }}
        >
          <Image
            src={"/icons/modals-and-messages/add-product-gray.svg"}
            width={35}
            height={35}
            style={{ opacity: "0.7" }}
            quality={1}
          ></Image>
          <p style={{ marginLeft: "5px", fontSize: "14px" }}>
            Agregar a la orden
          </p>
        </div>
      </div>
    </>
  );
}
