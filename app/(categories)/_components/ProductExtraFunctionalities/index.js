"use client";

import ColorsPalette from "./_components/ColorChange/ColorsPalette";

export default function ProductExtraFunctionalities({
  productUIType,
  setExtraParam,
  extraParam,
  imageUrl,
  designPSDId,
  designUrl,
  assignDesingToProductHandler,
  loadingDesign,
}) {
  const UI = {
    1: <></>,
    2: (
      <ColorsPalette
        setExtraParam={setExtraParam}
        extraParam={extraParam}
        imageUrl={imageUrl}
        designPSDId={designPSDId}
        designUrl={designUrl}
        assignDesingToProductHandler={assignDesingToProductHandler}
      />
    ),
  };
  return (
    <div
      style={{
        pointerEvents: loadingDesign ? "none" : "auto",
        opacity: loadingDesign ? 0.5 : 1,
      }}
    >
      {UI[productUIType]}
    </div>
  );
}
