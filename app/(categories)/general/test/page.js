"use client";
// App.js

import React, { useEffect, useRef, useState } from "react";
import {
  PSDFileLoader,
  Photopea,
  addImageAndWait,
  getDocumentAsImage,
} from "@/app/_lib/PhotopeaUtils";

const Page = () => {
  const photopeaIframeRef = useRef(null);
  const [imageURL, setImageURL] = useState("https://placehold.co/600x400"); // URL of the image to load
  const [loadedImage, setLoadedImage] = useState(null);

  const scriptActivation = async () => {
    if (!photopeaIframeRef.current) return;
    await PSDFileLoader(
      photopeaIframeRef.current.contentWindow,
      "https://xyzstorage.store/impretion-shops%2Fpsd-designs%2Fdog-designs%2Fcolored-mug%2FA1b2C.psd"
    );
  };

  return (
    <div style={{ height: "100vh" }}>
      <button onClick={scriptActivation}>ACTIVAR SCRIPTING</button>
      <iframe
        ref={photopeaIframeRef}
        src={`https://www.photopea.com`}
        style={{ width: "100%", height: "100%" }}
      ></iframe>
      {loadedImage && <img src={loadedImage.src} alt="Loaded from Photopea" />}
    </div>
  );
};

export default Page;
