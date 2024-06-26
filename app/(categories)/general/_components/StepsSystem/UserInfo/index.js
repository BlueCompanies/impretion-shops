"use client";

import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import ImageUploader from "./_components/ImageUploader";

export default function UserInfo({ setUserData, userData }) {
  const onChangeName = (event) => {
    const name = event.target.value;
    console.log(userData);
    setUserData((prevState) => ({ ...prevState, name }));
  };

  return (
    <div
      style={{
        margin: "10px",
        border: "1px solid #dedede",
        borderRadius: "6px",
        padding: "5px",
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
            background: "#8C52FF",
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
          <p style={{ fontWeight: 700 }}>PASO 1: UNA IMAGEN Y UN NOMBRE</p>
          <p style={{ fontSize: "13px" }}>
            La imagen y el nombre que pongas se verán reflejados en el producto
            que elijas.
          </p>
        </div>
      </div>
      <FieldDescription>
        Asegúrate de poner el nombre y la imagen de una persona especial para
        ti.
      </FieldDescription>

      <div
        style={{
          borderRadius: "4px",
        }}
      >
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
          placeholder="El nombre de alguien que quieras mucho"
          onChange={onChangeName}
          value={userData.name}
        ></input>
        <ImageUploader setUserData={setUserData} userData={userData} />
      </div>
    </div>
  );
}
