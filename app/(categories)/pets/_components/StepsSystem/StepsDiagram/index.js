"use client";

import Image from "next/image";
import UpdatePetData from "../../UpdatePetData";
import styles from "./styles.module.css";

export default function StepsDiagram({ currentStep, petData, setPetData }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #dedede",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            padding: "5px",
            borderRadius: "4px",
          }}
        >
          <div
            className={
              currentStep >= 1
                ? styles.filledStepNumber
                : styles.unfilledStepNumber
            }
          >
            1
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.stepText} style={{ fontWeight: 700 }}>
              Nombre y tipo de mascota
            </p>
            <p className={styles.stepText} style={{ fontSize: "12px" }}>
              {petData.petName}
              {currentStep === 3 && petData.petName.length === 0 && (
                <span style={{ color: "#8c52ff", textDecoration: "underline" }}>
                  Agrega un nombre
                </span>
              )}
            </p>
            <p className={styles.stepText} style={{ fontSize: "12px" }}>
              {petData.petType}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            padding: "5px",
          }}
        >
          <div
            className={
              currentStep >= 2
                ? styles.filledStepNumber
                : styles.unfilledStepNumber
            }
          >
            2
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.stepText} style={{ fontWeight: 700 }}>
              Foto de tu mascota
            </p>
            <div>
              {petData.image && (
                <Image
                  src={petData.image}
                  style={{
                    objectFit: "cover",
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                  }}
                  width={40}
                  height={40}
                  quality={20}
                  className={styles.stepText}
                ></Image>
              )}
              {currentStep === 3 && petData.image.length === 0 && (
                <span
                  style={{
                    color: "#8c52ff",
                    textDecoration: "underline",
                    fontSize: "12px",
                  }}
                  className={styles.stepText}
                >
                  Agrega una imagen
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            padding: "5px",
          }}
        >
          <div
            className={
              currentStep === 3
                ? styles.filledStepNumber
                : styles.unfilledStepNumber
            }
          >
            3
          </div>
          <p className={styles.stepText} style={{ fontWeight: 700 }}>
            Selecciona, personaliza y agrega a la orden los productos que desees
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            padding: "5px",
          }}
        >
          <div
            className={
              currentStep === 4
                ? styles.filledStepNumber
                : styles.unfilledStepNumber
            }
          >
            4
          </div>
          <p className={styles.stepText} style={{ fontWeight: 700 }}>
            Haz tu pedido
          </p>
        </div>
      </div>
      {currentStep === 3 && (
        <>
          <div
            style={{
              marginTop: "20px",
              border: "1px solid #dedede",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                background: "#fff",
                width: "fit-content",
                margin: "auto",
              }}
            >
              ¿Tienes mas mascotas o quieres actualizar los datos de tu
              mascota?, cambia los datos, prueba diseños y agregalos al pedido.
            </p>
            <UpdatePetData petData={petData} setPetData={setPetData} />
          </div>
          <div
            style={{ borderTop: "3px solid #dedede", marginTop: "20px" }}
          ></div>
        </>
      )}
    </>
  );
}
