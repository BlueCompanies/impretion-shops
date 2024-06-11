"use client";
import FirstStep from "./_components/StepsSystem/FirstStep";
import SecondStep from "./_components/StepsSystem/SecondStep";
import { useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState({
    image: "",
    name: "",
  });

  // allows to change some functionalities in the special scripts
  const [extraParam, setExtraParam] = useState();

  return (
    <>
      <div style={{ margin: "10px" }}>
        <FirstStep userData={userData} setUserData={setUserData} />
        <SecondStep
          data={userData}
          setExtraParam={setExtraParam}
          extraParam={extraParam}
        />
      </div>
    </>
  );
}
