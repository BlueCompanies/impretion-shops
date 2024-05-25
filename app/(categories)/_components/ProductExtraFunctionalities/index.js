"use client";

import ColorsPalette from "./_components/ColorChange/ColorsPalette";

export default function ProductExtraFunctionalities({
  productUIType,
  setExtraParam,
  extraParam,
  blobImageUrl,
}) {
  const UI = {
    1: <></>,
    2: (
      <ColorsPalette
        setExtraParam={setExtraParam}
        extraParam={extraParam}
        blobImageUrl={blobImageUrl}
      />
    ),
  };
  return <>{UI[productUIType]}</>;
}
