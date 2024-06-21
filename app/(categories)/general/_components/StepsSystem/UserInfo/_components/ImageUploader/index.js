"use client";
import { useRef, useEffect, useState } from "react";
import awsS3 from "@/app/_lib/aws/awsS3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import Image from "next/image";
import ShortUniqueId from "short-unique-id";
import BasicLoader from "@/app/(categories)/_components/Loadings/BasicLoader";

export default function ImageUploader({ setUserData, userData }) {
  const [uploadError, setUploadError] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const imageSelector = useRef(null);

  const imageUploaderHandler = () => {
    imageSelector.current.click();
  };

  const onImageUpload = async (e) => {
    const file = e.target.files[0];

    const allowedTypes = ["image/png", "image/gif", "image/jpeg"];
    const maxFileSize = 2 * 1024 * 1024;
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        setUploadError("Solo se permiten archivos PNG/JPG.");
        return;
      }

      if (file.size > maxFileSize) {
        setUploadError(
          "El archivo supera el límite permitido de 2 MB. Por favor, sube una imagen más pequeña."
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const arrayBuffer = reader.result;

        try {
          setImageLoading(true);
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
          setUserData({ ...userData, image: generatedUrl });
          setImageLoading(false);
        } catch (error) {
          console.error("S3 upload error: ", error);
        }
      };
      reader.readAsArrayBuffer(file);
      setUploadError("");
    }
  };

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={imageSelector}
        onChange={onImageUpload}
        accept="image/png, image/jpeg, image/jpg"
      />
      {uploadError.length > 0 && (
        <div
          style={{
            background: "red",
            color: "red",
            fontSize: "12px",
            padding: "5px",
            marginBottom: "5px",
            borderRadius: "4px",
            border: "1px solid red",
            backgroundColor: "#FFD8D8",
          }}
        >
          {uploadError}
        </div>
      )}
      <div
        style={{
          border: "2px dotted #1431B8",
          height: "170px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#BCC8FF",
          marginBottom: "10px",
          width: "100%",
        }}
        onClick={imageUploaderHandler}
      >
        {imageLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>Tu imagen esta cargando...</p>
            <BasicLoader />
          </div>
        ) : (
          <>
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
                {userData?.image ? (
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
                    <div style={{ width: "150px" }}>
                      <span style={{ fontSize: "12px" }}>
                        SUBE LA IMAGEN DE ALGUIEN QUE APRECIES
                      </span>
                    </div>
                    <Image
                      src="/icons/modals-and-messages/upload-image.svg"
                      width={40}
                      height={40}
                      quality={10}
                      alt="Add"
                    />
                  </div>
                )}
              </div>
            </div>
            {userData && userData.image ? (
              <Image
                width={150}
                height={150}
                src={userData?.image}
                alt="User Image"
                style={{
                  margin: "10px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
                quality={20}
                priority={true}
              />
            ) : (
              <Image
                width={150}
                height={150}
                src="/images/placeholder-images/general-image-upload-placeholder.webp"
                alt="Placeholder"
                priority={true}
                style={{ margin: "10px" }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
