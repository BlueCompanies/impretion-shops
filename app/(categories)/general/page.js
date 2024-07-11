"use client";

import { useState } from "react";
import ProductsList from "./_components/StepsSystem/ProductsList";
import FieldDescription from "../_components/FieldDescription";

export default function Page() {
  const [userData, setUserData] = useState({
    image: "",
    name: "",
  });

  // allows to change some functionalities in the special scripts
  const [extraParam, setExtraParam] = useState("");

  return (
    <>
      <div style={{ margin: "10px" }}>
        <FieldDescription>
          Elige tu tipo de taza favorito y personalízala.
        </FieldDescription>
        {/*<FirstStep userData={userData} setUserData={setUserData} />*/}
        <ProductsList
          data={userData}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
          setUserData={setUserData}
          userData={userData}
        />
      </div>
    </>
  );
}
