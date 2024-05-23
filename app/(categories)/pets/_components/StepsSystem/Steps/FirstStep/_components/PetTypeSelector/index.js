"use client";

import Image from "next/image";
import { useState } from "react";

export default function PetTypeSelector({ setPetData, petData }) {
  const selectedPetHandler = (pet) => {
    const petType = pet;
    setPetData((prevState) => ({ ...prevState, petType }));
  };

  return (
    <div>
      <p style={{ fontSize: "12px" }}>
        Depende de el tipo de tu mascota te mostraremos unos diseños u otros!
      </p>
      <div
        style={{
          display: "flex",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginTop: "5px",
          alignItems: "center",
          fontSize: "17px",
          background: "#fff",
        }}
        onClick={() => selectedPetHandler("Perro")}
      >
        <div
          style={{
            marginRight: "10px",
            backgroundColor: petData.petType === "Perro" ? "#8C52FF" : "#fff",
            borderRadius: "50%",
            width: "23px",
            display: "flex",
            height: "23px",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #8C52FF",
          }}
        ></div>
        <p>Perro</p>
        <Image
          src="/icons/modals-and-messages/dog.svg"
          width={30}
          height={30}
          style={{ marginLeft: "5px" }}
        ></Image>
      </div>
      <div
        style={{
          display: "flex",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginTop: "5px",
          alignItems: "center",
          fontSize: "17px",
          background: "#fff",
        }}
        onClick={() => selectedPetHandler("Gato")}
      >
        <div
          style={{
            marginRight: "10px",
            backgroundColor: petData.petType === "Gato" ? "#8C52FF" : "#fff",
            borderRadius: "50%",
            width: "23px",
            display: "flex",
            height: "23px",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #8C52FF",
          }}
        ></div>
        <p>Gato</p>
        <Image
          src="/icons/modals-and-messages/cat.svg"
          width={30}
          height={30}
          style={{ marginLeft: "5px" }}
        ></Image>
      </div>
    </div>
  );
}
