"use client";

import { useEffect, useState } from "react";
import CustomizeWindow from "../CustomizeWindow";

export default function SelectedProduct({
  selectedProduct,
  productURL,
  productName,
  petData,
}) {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [photopeaString, setPhotopeaString] = useState("");
  const [designId, setDesignId] = useState(0); // Key to force iframe re-render
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loadingDesign, setLoadingDesign] = useState(false);

  async function handleMessage(event) {
    if (event.data === "processed") setLoadingDesign(false);
    if (event.data instanceof ArrayBuffer || event.data instanceof Blob) {
      const blob =
        event.data instanceof Blob
          ? event.data
          : new Blob([event.data], { type: "image/png" });

      // Create an object URL for the blob and set it as the new image URL
      const newImageUrl = URL.createObjectURL(blob);
      setNewImageUrl(newImageUrl);

      const formData = new FormData();
      formData.append("image", blob, "image.png");
    }
  }

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const assignDesingToProductHandler = async (designId) => {
    if (designId === designId) {
      setLoadingDesign(true);
    }
    setDesignId(designId);
  };

  useEffect(() => {
    const petName =
      petData.petName.length > 0 ? petData.petName : "Nombre mascota";
    const config = {
      files: [
        petData.image ||
          "https://xyzstorage.store/test-images/placeholder-img.webp",
        `https://xyzstorage.store/impretion-shops/psd-designs/${productURL}/${designId}.psd`,
      ],
      script:
        "function openSmartObjectContents(smartObjectLayer) { if (!smartObjectLayer || smartObjectLayer.kind !== LayerKind.SMARTOBJECT) { return; } if (smartObjectLayer.name.startsWith('#')) { var docRef = app.activeDocument; docRef.activeLayer = smartObjectLayer; var idEditContents = stringIDToTypeID('placedLayerEditContents'); var desc = new ActionDescriptor(); executeAction(idEditContents, desc, DialogModes.NO); app.activeDocument.paste(); var newLayer = app.activeDocument.activeLayer; var smartObjectWidth = app.activeDocument.width; var smartObjectHeight = app.activeDocument.height; var newLayerWidth = newLayer.bounds[2] - newLayer.bounds[0]; var newLayerHeight = newLayer.bounds[3] - newLayer.bounds[1]; var widthScale = (smartObjectWidth / newLayerWidth) * 100; newLayer.resize(widthScale, widthScale, AnchorPosition.MIDDLECENTER); newLayerHeight = newLayer.bounds[3] - newLayer.bounds[1]; if (newLayerHeight < smartObjectHeight) { var heightScale = (smartObjectHeight / newLayerHeight) * 100; newLayer.resize(heightScale, heightScale, AnchorPosition.MIDDLECENTER); } newLayer.translate((smartObjectWidth - (newLayer.bounds[2] - newLayer.bounds[0])) / 2 - newLayer.bounds[0], (smartObjectHeight - (newLayer.bounds[3] - newLayer.bounds[1])) / 2 - newLayer.bounds[1]); var placeholderLayerFound = false; for (var i = app.activeDocument.layers.length - 1; i >= 0; i--) { var currentLayer = app.activeDocument.layers[i]; if (currentLayer !== newLayer && currentLayer.name.includes('!')) { currentLayer.remove(); } if (currentLayer.name === '!placeholder') { placeholderLayerFound = true; } } if (!placeholderLayerFound) { app.echoToOE('placeholderLayerError'); } else { newLayer.name = '!placeholder'; app.activeDocument.save(); app.activeDocument.close(SaveOptions.SAVECHANGES); } } } function processActiveDocument() { var doc = app.activeDocument; try { var layer = doc.layers.getByName('$petNamePlaceholder'); if (layer && layer.kind === LayerKind.TEXT) { layer.textItem.contents = '" +
        petName +
        "'; layer.textItem.justification = Justification.CENTER; } } catch (e) {} if (app.documents.length === 1) { var firstLayer = doc.layers[0]; doc.activeLayer = firstLayer; firstLayer.copy(); } for (var j = 0; j < doc.layers.length; j++) { var layer = doc.layers[j]; openSmartObjectContents(layer); } if (app.documents.length !== 1) { doc.saveToOE('png'); } app.echoToOE('processed');} processActiveDocument();",
    };

    const configString = JSON.stringify(config);
    const encodedConfig = encodeURIComponent(configString);
    setPhotopeaString(encodedConfig);
  }, [designId]);

  const closeCustomizeWindow = () => {
    setIsCustomizing(false);
  };

  useEffect(() => {
    console.log("Loading design status:", loadingDesign);
  }, [loadingDesign]);

  return (
    <>
      {loadingDesign && <div>Loading...</div>}
      {photopeaString && (
        <iframe
          key={designId} // Use the key to force re-render
          src={`https://www.photopea.com#${photopeaString}`}
          style={{
            width: "100%",
            height: "100%",
            display: "none",
          }}
        ></iframe>
      )}

      <CustomizeWindow
        isCustomizing={isCustomizing}
        selectedProduct={selectedProduct}
        newImageUrl={newImageUrl}
        assignDesingToProductHandler={assignDesingToProductHandler}
        closeCustomizeWindow={closeCustomizeWindow}
        productName={productName}
        loadingDesign={loadingDesign}
        designId={designId}
      />

      <div style={{ display: "flex", width: "100%" }}>
        <button
          style={{
            margin: "2px",
            fontSize: "13px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            padding: "4px",
            background: "#8c52ff",
            color: "#fff",
          }}
          onClick={() => setIsCustomizing(true)}
        >
          PERSONALIZAR
        </button>
      </div>
    </>
  );
}
