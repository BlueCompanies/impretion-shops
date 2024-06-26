"use client";

import { useState } from "react";
import ProductsList from "./_components/StepsSystem/ProductsList";

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
