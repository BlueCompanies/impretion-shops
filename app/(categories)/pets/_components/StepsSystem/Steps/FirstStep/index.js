"use client";

import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import StepsHandlerBtns from "../../StepsHandlerBtns";
import PetTypeSelector from "./_components/PetTypeSelector";

export default function FirstStep({
  setCurrentStep,
  currentStep,
  setPetData,
  petData,
}) {
  const onChangePetName = (event) => {
    const petName = event.target.value;
    setPetData((prevState) => ({ ...prevState, petName }));
  };

  return (
    <>
      <FieldDescription>
        Comencemos dandonos el nombre de tu mascota, de esta forma más adelante
        plasmaremos ese nombre en el producto que selecciones!
      </FieldDescription>
      <div>
        <p style={{ marginBottom: "10px", fontSize: "12px" }}>
          El nombre de tu mascota es importante a la hora de personalizar algun
          producto, sin embargo, si no tienes ningun nombre simplemente dale en
          &quot;Saltar&quot;
        </p>
        <input
          type="text"
          placeholder="Nombre de tu mascota"
          style={{
            width: "100%",
            height: "40px",
            fontSize: "17px",
            padding: "5px",
            border: "none",
            outline: "1px solid #dedede",
            borderRadius: "4px",
            color: "var(--text-color)",
          }}
          onChange={onChangePetName}
        ></input>

        <PetTypeSelector setPetData={setPetData} petData={petData} />

        <StepsHandlerBtns
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
        />
      </div>
    </>
  );
}
