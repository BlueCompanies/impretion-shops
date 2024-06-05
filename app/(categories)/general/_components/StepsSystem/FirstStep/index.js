"use client";

import ImageUploader from "./_components/ImageUpaloder";

export default function FirstStep({ setUserData, userData }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          border: "1px solid #dedede",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              minWidth: "50px",
              minHeight: "50px",
              borderRadius: "50%",
              background: "#5271FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: 700,
              fontSize: "26px",
              color: "#fff",
            }}
          >
            1
          </div>
          <div style={{ marginLeft: "10px" }}>
            <p style={{ fontWeight: 700 }}>PASO 1: UN NOMBRE Y UNA FOTO</p>
            <p style={{ fontSize: "12px" }}>
              Comencemos por agregar el nombre y una frase memorable para esa
              persona especial. Podras ver esto reflejado en el producto que
              elijas.
            </p>
          </div>
        </div>
        <input
          type="text"
          style={{
            width: "100%",
            height: "35px",
            outline: "none",
            border: "1px solid #dedede",
            borderRadius: "4px",
            padding: "5px",
            marginBottom: "5px",
            fontSize: "16px",
          }}
          placeholder="Nombre de un familiar o alguien que quieras mucho"
        ></input>
        <ImageUploader setUserData={setUserData} userData={userData} />
      </div>
    </div>
  );
}
