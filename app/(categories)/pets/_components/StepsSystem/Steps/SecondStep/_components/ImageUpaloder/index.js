"use client";
import { useState, useRef, useEffect } from "react";
import awsS3 from "@/app/_lib/aws/awsS3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Image from "next/image";
import ShortUniqueId from "short-unique-id";

export default function ImageUploader({ setPetData, petData }) {
  const imageSelector = useRef(null);

  const imageUploaderHandler = () => {
    imageSelector.current.click();
  };

  const onImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;

        try {
          const uid = new ShortUniqueId({ length: 10 });
          const generatedId = uid.rnd();

          // Create the PutObjectCommand
          let command = new PutObjectCommand({
            Bucket: "impretion",
            Key: `test-images/${generatedId}.png`,
            Body: arrayBuffer,
          });

          // Upload the image to S3
          await awsS3().send(command);

          const generatedUrl = `https://xyzstorage.store/test-images/${generatedId}.png`;
          // Create a URL for the image to display in the img tag
          setPetData({ ...petData, image: generatedUrl });
        } catch (error) {
          console.error("S3 upload error: ", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    console.log("petData: ", petData);
  }, [petData]);

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={imageSelector}
        onChange={onImageUpload}
      />
      <div
        style={{
          border: "2px dotted #8C52FF",
          height: "170px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#E7DAFF",
          marginBottom: "10px",
          width: "100%",
        }}
        onClick={imageUploaderHandler}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              color: "#555555",
              fontWeight: 700,
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {petData.image ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span>Cambiar imagen</span>
                <Image
                  src="/icons/modals-and-messages/change.webp"
                  width={40}
                  height={40}
                  alt="Change"
                />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span>Agrega una imagen de tu mascota</span>
                <Image
                  src="/icons/modals-and-messages/camera.webp"
                  width={40}
                  height={40}
                  alt="Add"
                />
              </div>
            )}
          </div>
        </div>
        {petData.image ? (
          <Image
            width={150}
            height={150}
            src={petData.image}
            alt="Pet"
            style={{ margin: "10px", borderRadius: "4px", objectFit: "cover" }}
            quality={20}
          />
        ) : (
          <Image
            width={150}
            height={150}
            src="/images/placeholder-images/image-upload-placeholder.webp"
            alt="Placeholder"
            style={{ margin: "10px" }}
          />
        )}
      </div>
    </>
  );
}
