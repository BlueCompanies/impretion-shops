"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductViewFullScreen({ blobImageUrl }) {
  const [showModalWindow, setShowModalWindow] = useState(false);

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {showModalWindow ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            background: "red",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999, // Ensure the component is on top
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setShowModalWindow(false)}
            style={{
              margin: "20px",
              position: "absolute",
              height: "70px",
              width: "70px",
              borderRadius: "50%",
              fontSize: "35px",
              border: "none",
              outline: "none",
              background: "#555555",
              color: "#fff",
              opacity: 0.5,
            }}
          >
            X
          </button>
          <div
            style={{
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minWidth: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={
                blobImageUrl ||
                "https://xyzstorage.store/impretion-shops%2Fproducts-placeholder%2Fmug-placeholder.png"
              }
              width={350}
              height={350}
              alt="Full screen image"
            ></img>
            <img src=""></img>
          </div>
        </div>
      ) : (
        blobImageUrl && (
          <button
            onClick={() => setShowModalWindow(true)}
            style={{
              position: "absolute",
              top: 1,
              right: 1,
              fontSize: "11px",
              border: "none",
              outline: "none",
              padding: "5px",
              borderRadius: "4px",
              background: "none",
            }}
          >
            <p style={{ fontSize: "9px" }}>Expandir</p>
            <Image
              src="/icons/modals-and-messages/expand.svg"
              width={40}
              height={40}
            ></Image>
          </button>
        )
      )}
    </>
  );
}
