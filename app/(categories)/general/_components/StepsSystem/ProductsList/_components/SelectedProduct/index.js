"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import CustomizeWindow from "../CustomizeWindow";
import { getCookie } from "cookies-next";
import generalFacts from "@/app/_lib/trivia/general.json";
import { useRouter, useSearchParams } from "next/navigation";
import FieldDescription from "@/app/(categories)/_components/FieldDescription";

export default function SelectedProduct({
  productData,
  data,
  productUIType,
  setExtraParam,
  extraParam,
  setUserData,
  userData,
  psdDesigns,
}) {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [designPSDId, setDesignPSDId] = useState(0); // Key to force iframe re-render
  const [designUrl, setDesignUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loadingDesign, setLoadingDesign] = useState(false);
  const [fact, setFact] = useState("");
  const clientSession = getCookie("clientSession");
  const router = useRouter();
  const searchParams = useSearchParams();
  const devMode = process.env.NEXT_PUBLIC_CURRENT_ENV;

  /*
  useEffect(() => {
    if (!photopeaRef.current) return;
    const wnd = photopeaRef.current.contentWindow;
    wnd.postMessage(
      "function changeSolidColorLayer() { var sColor = new SolidColor(); sColor.rgb.hexValue = '" +
        extraParam +
        "'; changeSolidFillColor('color', sColor); function changeSolidFillColor(layerName, sColor) { var doc = app.activeDocument; var layerFound = false; for (var j = 0; j < doc.artLayers.length; j++) { var layer = doc.artLayers[j]; if (layer.kind === LayerKind.SOLIDFILL && layer.name === layerName) { setColorOfFillLayer(layer, sColor); alert('Color changed successfully!'); layerFound = true; break; } } if (!layerFound) { alert('Layer ' + layerName + ' not found.'); } } function setColorOfFillLayer(layer, sColor) { app.activeDocument.activeLayer = layer; var desc = new ActionDescriptor(); var ref = new ActionReference(); ref.putEnumerated(stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt')); desc.putReference(charIDToTypeID('null'), ref); var fillDesc = new ActionDescriptor(); var colorDesc = new ActionDescriptor(); colorDesc.putDouble(charIDToTypeID('Rd  '), sColor.rgb.red); colorDesc.putDouble(charIDToTypeID('Grn '), sColor.rgb.green); colorDesc.putDouble(charIDToTypeID('Bl  '), sColor.rgb.blue); fillDesc.putObject(charIDToTypeID('Clr '), charIDToTypeID('RGBC'), colorDesc); desc.putObject(charIDToTypeID('T   '), stringIDToTypeID('solidColorLayer'), fillDesc); executeAction(charIDToTypeID('setd'), desc, DialogModes.NO); doc.saveToOE('png'); } } changeSolidColorLayer();",
      "*"
    );
  }, [extraParam]);

  async function handleMessage(event) {
    if (event.data === "processed") setLoadingDesign(false);
    if (event.data instanceof ArrayBuffer || event.data instanceof Blob) {
      const blob =
        event.data instanceof Blob
          ? event.data
          : new Blob([event.data], { type: "image/png" });

      // Create an object URL for the blob and set it as the new image UR
      setImageUrl(URL.createObjectURL(blob));
    }
  }
  
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  */

  const assignDesingToProductHandler = async (
    designPSDId,
    designUrl,
    additionalScript
  ) => {
    try {
      setLoadingDesign(true);
      setDesignPSDId(designPSDId);
      setDesignUrl(designUrl);
      setFact(generalFacts[Math.floor(Math.random() * 50)].fact);
      const { productRawName } = productData;
      const designPSDUrl = `https://xyzstorage.store/impretion-shops/designs/${psdDesigns}/${productData.rawName}/${designPSDId}.psd`;

      const response = await fetch("/api/proxy/mockup-generator", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          image: userData.image,
          designPSDUrl,
          designs: psdDesigns,
          productType: productRawName,
          sessionId: clientSession,
          additionalScript,
          ...(devMode === "development" && { devEnv: true }),
        }),
      });

      if (response.status === 200) {
        const mockupUrl = await response.json();
        console.log(mockupUrl);
        setImageUrl(mockupUrl);
      } else {
        alert("Ha ocurrido un error!");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
    setLoadingDesign(false);
  };

  /*
  useEffect(() => {
    let currentParam = "";
    if (currentParam !== extraParam) {
      console.log("did it?? ");
      currentParam = extraParam;
      assignDesingToProductHandler(designId, designUrl);
    }
  }, [extraParam]);

  useEffect(() => {
    const name = data?.name?.length > 0 ? data?.name : "Nombre";

    const config = {
      files: [
        data?.image ||
          "https://xyzstorage.store/impretion-shops%2Fplaceholder-images%2Fgeneral.webp",
        designId === "no-design"
          ? `https://xyzstorage.store/impretion-shops/psd-designs/fathers-day-designs/${productData?.productRawName}/no-design.psd`
          : `https://xyzstorage.store/impretion-shops/psd-designs/fathers-day-designs/${productData?.productRawName}/${designId}.psd`,
      ],
      script:
        "function openSmartObjectContents(smartObjectLayer) { if (!smartObjectLayer || smartObjectLayer.kind !== LayerKind.SMARTOBJECT) { return; } if (smartObjectLayer.name.startsWith('#')) { var docRef = app.activeDocument; docRef.activeLayer = smartObjectLayer; var idEditContents = stringIDToTypeID('placedLayerEditContents'); var desc = new ActionDescriptor(); executeAction(idEditContents, desc, DialogModes.NO); app.activeDocument.paste(); var newLayer = app.activeDocument.activeLayer; var smartObjectWidth = app.activeDocument.width; var smartObjectHeight = app.activeDocument.height; var newLayerWidth = newLayer.bounds[2] - newLayer.bounds[0]; var newLayerHeight = newLayer.bounds[3] - newLayer.bounds[1]; var widthScale = (smartObjectWidth / newLayerWidth) * 100; newLayer.resize(widthScale, widthScale, AnchorPosition.MIDDLECENTER); newLayerHeight = newLayer.bounds[3] - newLayer.bounds[1]; if (newLayerHeight < smartObjectHeight) { var heightScale = (smartObjectHeight / newLayerHeight) * 100; newLayer.resize(heightScale, heightScale, AnchorPosition.MIDDLECENTER); } newLayer.translate((smartObjectWidth - (newLayer.bounds[2] - newLayer.bounds[0])) / 2 - newLayer.bounds[0], (smartObjectHeight - (newLayer.bounds[3] - newLayer.bounds[1])) / 2 - newLayer.bounds[1]); var placeholderLayerFound = false; for (var i = app.activeDocument.layers.length - 1; i >= 0; i--) { var currentLayer = app.activeDocument.layers[i]; if (currentLayer !== newLayer && currentLayer.name.includes('!')) { currentLayer.remove(); } if (currentLayer.name === '!placeholder') { placeholderLayerFound = true; } } if (!placeholderLayerFound) { app.echoToOE('placeholderLayerError'); } else { newLayer.name = '!placeholder'; app.activeDocument.save(); app.activeDocument.close(SaveOptions.SAVECHANGES); } } } function processActiveDocument() { var doc = app.activeDocument; try { var layer = doc.layers.getByName('$name'); if (layer && layer.kind === LayerKind.TEXT) { layer.textItem.contents = '" +
        name +
        "'; layer.textItem.justification = Justification.CENTER; } } catch (e) {} if (app.documents.length === 1) { var firstLayer = doc.layers[0]; doc.activeLayer = firstLayer; firstLayer.copy(); } for (var j = 0; j < doc.layers.length; j++) { var layer = doc.layers[j]; openSmartObjectContents(layer); } if (app.documents.length !== 1) { doc.saveToOE('png'); } app.echoToOE('processed');} processActiveDocument();",
    };

    const configString = JSON.stringify(config);
    console.log(configString);
    const encodedConfig = encodeURIComponent(configString);
    setPhotopeaString(encodedConfig);
  }, [designId]);
   */

  const closeCustomizeWindow = () => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);

    searchParams.delete("product");

    router.push(`${currentUrl.pathname}?${searchParams.toString()}`, {
      scroll: false,
    });

    setIsCustomizing(false);
  };

  const openCustomizeWindow = () => {
    setImageUrl("");
    setDesignPSDId("");

    // Get the current URL
    const currentUrl = new URL(window.location.href);

    // Get the current search params
    const searchParams = new URLSearchParams(currentUrl.search);

    // Add or update the 'product' parameter
    searchParams.set("product", productData.rawName);

    // Update the URL without navigating
    router.push(`${currentUrl.pathname}?${searchParams.toString()}`, {
      scroll: false,
    });

    setIsCustomizing(true);
  };

  // Ensure to close customize window if user goes "back"
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const currentProduct = searchParams.get("product");

    if (!currentProduct) {
      setIsCustomizing(false);
    }
  }, [router, searchParams]);

  return (
    <>
      <CustomizeWindow
        isCustomizing={isCustomizing}
        psdDesigns={psdDesigns}
        productData={productData}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        assignDesingToProductHandler={assignDesingToProductHandler}
        closeCustomizeWindow={closeCustomizeWindow}
        loadingDesign={loadingDesign}
        designPSDId={designPSDId}
        designUrl={designUrl}
        productUIType={productUIType}
        setExtraParam={setExtraParam}
        extraParam={extraParam}
        data={data}
        setUserData={setUserData}
        userData={userData}
        fact={fact}
        clientSession={clientSession}
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
            height: "30px",
            fontWeight: 700,
          }}
          onClick={() => openCustomizeWindow()}
        >
          PERSONALIZAR
        </button>
      </div>
    </>
  );
}
