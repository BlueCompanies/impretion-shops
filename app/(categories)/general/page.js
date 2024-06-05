"use client";
import Link from "next/link";
import FirstStep from "./_components/StepsSystem/FirstStep";
import SecondStep from "./_components/StepsSystem/SecondStep";
import { useState } from "react";

export default function Page() {
  const [userData, setUserData] = useState({
    image: "",
    name: "",
  });
  //
  return (
    <>
      <div style={{ margin: "10px" }}>
        <FirstStep userData={userData} setUserData={setUserData} />
        <SecondStep data={userData} />
      </div>
    </>
  );
}
