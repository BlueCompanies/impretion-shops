"use client";

import { useState } from "react";
import FirstStep from "./_components/StepsSystem/Steps/FirstStep";
import StepsDiagram from "./_components/StepsSystem/StepsDiagram";
import SecondStep from "./_components/StepsSystem/Steps/SecondStep";
import ThirdStep from "./_components/StepsSystem/Steps/ThirdStep";
import CustomerOrder from "../_components/CustomerOrder";
import styles from "./styles.module.css";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [petData, setPetData] = useState({
    image: "",
    petName: "",
    petType: "Perro",
  });

  // allows to change some functionalities in the special scripts
  const [extraParam, setExtraParam] = useState();

  // Define the steps mapping
  const steps = {
    1: (
      <FirstStep
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        setPetData={setPetData}
        petData={petData}
      />
    ),
    2: (
      <SecondStep
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        setPetData={setPetData}
        petData={petData}
      />
    ),
    3: (
      <ThirdStep
        petData={petData}
        setExtraParam={setExtraParam}
        extraParam={extraParam}
      />
    ),
  };

  return (
    <div style={{ margin: "10px" }}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StepsDiagram
          currentStep={currentStep}
          petData={petData}
          setPetData={setPetData}
        />
        <div style={{ marginTop: "30px" }}>{steps[currentStep]}</div>
      </div>

      <div className={styles.verticalSeparator}></div>
    </div>
  );
}
