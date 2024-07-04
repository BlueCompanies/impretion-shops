"use client";

import { useEffect, useState } from "react";
import Colors from "../Colors";

export default function ColorsPalette({
  imageUrl,
  designPSDId,
  designUrl,
  assignDesingToProductHandler,
}) {
  const [selectedColor, setSelectedColor] = useState("40a1fd");
  const colorChangeHandler = (hexColor) => {
    if (hexColor !== selectedColor) {
      assignDesingToProductHandler(
        designPSDId,
        designUrl,
        "function changeSolidColorLayer() { var sColor = new SolidColor(); sColor.rgb.hexValue = '" +
          hexColor +
          "'; changeSolidFillColor('color', sColor); function changeSolidFillColor(layerName, sColor) { var doc = app.activeDocument; var layerFound = false; for (var j = 0; j < doc.artLayers.length; j++) { var layer = doc.artLayers[j]; if (layer.kind === LayerKind.SOLIDFILL && layer.name === layerName) { setColorOfFillLayer(layer, sColor); alert('Color changed successfully!'); layerFound = true; break; } } if (!layerFound) { alert('Layer ' + layerName + ' not found.'); } } function setColorOfFillLayer(layer, sColor) { app.activeDocument.activeLayer = layer; var desc = new ActionDescriptor(); var ref = new ActionReference(); ref.putEnumerated(stringIDToTypeID('contentLayer'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt')); desc.putReference(charIDToTypeID('null'), ref); var fillDesc = new ActionDescriptor(); var colorDesc = new ActionDescriptor(); colorDesc.putDouble(charIDToTypeID('Rd  '), sColor.rgb.red); colorDesc.putDouble(charIDToTypeID('Grn '), sColor.rgb.green); colorDesc.putDouble(charIDToTypeID('Bl  '), sColor.rgb.blue); fillDesc.putObject(charIDToTypeID('Clr '), charIDToTypeID('RGBC'), colorDesc); desc.putObject(charIDToTypeID('T   '), stringIDToTypeID('solidColorLayer'), fillDesc); executeAction(charIDToTypeID('setd'), desc, DialogModes.NO); } } changeSolidColorLayer();"
      );
      setSelectedColor(hexColor);
    }
  };

  useEffect(() => {
    setSelectedColor("40a1fd");
  }, [designUrl]);

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
            selectedColor={selectedColor}
          />
          {!imageUrl && (
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
