"use client";

import awsS3 from "@/app/_lib/aws/awsS3";
import ShortUniqueId from "short-unique-id";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import NewAddedProductModal from "./_components/NewAddedProductModal";
import Image from "next/image";

export default function AddProductToOrder({
  productData,
  userData,
  imageUrl,
  designPSDId,
  designUrl,
  psdDesigns,
}) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [addedProductImage, setAddedProductImage] = useState("");

  const newProductHandler = async () => {
    if (!imageUrl) return;
    const clientSession = getCookie("clientSession");
    setLoading(true);
    setShowModal(true);

    // Validates if the current session is on the DB yet, if there is not return a message to reload.
    const response = await fetch("/api/temporal-session-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clientSession }),
    });
    const data = await response.json();
    if (!data) {
      setError({
        status: true,
        message:
          "Parece que tu sesión ha expirado. Por favor, recarga la página.",
      });
      deleteCookie("clientSession");
      setLoading(false);
      return;
    }

    /*
    // Convertig rawBlobImage into an arrayBuffer to be uploaded to S3
    const arrayBuffer = await new Response(imageUrl).arrayBuffer();
    
    let url = imageUrl.substring("https://xyzstorage.store".length);
    
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
        setAddedProductImage(imageUrl);
      }
    });
     */

    setAddedProductImage(imageUrl);
    const uid = new ShortUniqueId({ length: 10 });
    const generatedId = uid.rnd();

    // Set order, save it on DB
    const newProduct = await fetch("/api/new-product", {
      method: "POST",
      headers: { contentType: "application/json" },
      body: JSON.stringify({
        clientSession,
        generatedId,
        productData: {
          designData: {
            designPSDId,
            designUrl,
            psdDesignsGroup: psdDesigns,
            image: userData.image,
            name: userData.name,
          },
          rawName: productData?.rawName,
          fullName: productData?.fullName,
          priceData: {
            salePrice: productData?.priceData.salePrice,
            basePrice: productData?.priceData.basePrice,
            profit: productData?.priceData.profit,
          },
          mockupPreview: imageUrl,
        },
      }),
    });

    if (newProduct.status === 200) {
      setLoading(false);
      setError({ status: false, message: "" });
    } else {
      setError({
        status: true,
        message: "Ha ocurrido un error en el servidor.",
      });
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
            border: imageUrl ? "1px solid green" : "1px solid #5555",
            background: imageUrl ? "#00EF7C" : "#dedede",
            color: imageUrl ? "green" : "#555555",
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
