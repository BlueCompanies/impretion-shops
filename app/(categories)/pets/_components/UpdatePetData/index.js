"use client";

import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import { useState } from "react";
import ImageUploader from "../StepsSystem/Steps/SecondStep/_components/ImageUpaloder";
import Image from "next/image";
import PetTypeSelector from "../StepsSystem/Steps/FirstStep/_components/PetTypeSelector";

export default function UpdatePetData({ petData, setPetData }) {
  const [showModal, setShowModal] = useState(false);

  const onPetNameChange = (e) => {
    const petName = e.target.value;
    setPetData({ ...petData, petName });
  };

  return (
    <div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100vh",
            width: "100vw",
            background: "#fff",
            zIndex: 1000, // Ensure it's on top
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <button
            onClick={() => setShowModal(false)}
            style={{
              position: "absolute",
              background: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "25px",
              color: "#fff",
              backgroundColor: "#555555",
              height: "40px",
              width: "40px",
              borderRadius: "50%",
            }}
          >
            X
          </button>

          <div style={{ marginTop: "80px", height: "100%" }}>
            <h2>Cambiar datos de mascota</h2>
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontSize: "12px" }}>
                {petData.petName ? (
                  <>Este es el nombre de tu mascota:</>
                ) : (
                  <>Agrega el nombre de tu mascota:</>
                )}
              </p>
              <input
                type="text"
                style={{
                  width: "100%",
                  fontSize: "16px",
                  padding: "10px",
                  outline: "none",
                  border: "1px solid #dedede",
                  borderRadius: "4px",
                  color: "#555555",
                  marginTop: "10px",
                }}
                placeholder="Nombre mascota"
                value={petData.petName}
                onChange={onPetNameChange}
              ></input>
            </div>

            <div
              style={{
                marginTop: "15px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                {petData.image ? (
                  <>Esta es la imagen de tu mascota:</>
                ) : (
                  <>Agrega una imagen de tu mascota:</>
                )}
              </p>
              <div style={{ display: "flex" }}>
                <>
                  <ImageUploader setPetData={setPetData} petData={petData} />
                </>
              </div>
            </div>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                {petData.image && <>Tu mascota es un:</>}
              </p>
              <div style={{ display: "flex" }}>
                <>
                  <PetTypeSelector petData={petData} setPetData={setPetData} />
                </>
              </div>
            </div>

            <FieldDescription marginTop={"10px"}>
              Actualiza estos datos en caso de que quieras ver y hacer diseños
              nuevos con el nombre o foto de otra mascota o para actualizar el
              nombre o foto de la mascota actual.
            </FieldDescription>
          </div>
        </div>
      )}
      <button
        style={{
          border: "none",
          outline: "none",
          padding: "10px",
          background: "#8c52ff",
          borderRadius: "4px",
          color: "#fff",
          width: "100%",
        }}
        onClick={() => setShowModal(true)}
      >
        Cambiar datos
      </button>
    </div>
  );
}
