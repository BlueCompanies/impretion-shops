"use client";

import Colors from "../Colors";

export default function ColorsPalette({
  setExtraParam,
  extraParam,
  blobImageUrl,
}) {
  const colorChangeHandler = (hexColor) => {
    setExtraParam(hexColor);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            marginTop: "20px",
            height: "40px",
            margin: "10px",
            borderRadius: "4px",
            border: "1px solid #dedede",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            position: "relative",
          }}
        >
          <Colors
            colorChangeHandler={colorChangeHandler}
            extraParam={extraParam}
          />
          {!blobImageUrl && (
            <div
              style={{
                background: "#dedede",
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0.9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
              }}
            >
              <p style={{ opacity: 1, color: "#555" }}>Selecciona un diseño</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
