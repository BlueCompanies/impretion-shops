import FieldDescription from "@/app/(categories)/_components/FieldDescription";
import StepsHandlerBtns from "../../StepsHandlerBtns";
import ImageUploader from "./_components/ImageUpaloder";

export default function SecondStep({
  setCurrentStep,
  currentStep,
  setPetData,
  petData,
}) {
  return (
    <>
      <FieldDescription>
        Utilizaremos esta imagen para ponerla en varios diseños y que puedas ver
        como se veria esta imagen en el producto que elijas, si no tienes fotos
        simplemente dale en "Saltar"
      </FieldDescription>
      <p style={{ marginBottom: "10px", fontSize: "12px" }}>
        Incluso si la foto no tiene muy buena calidad nosotros nos encargamos de
        mejorarla!
      </p>

      <ImageUploader setPetData={setPetData} petData={petData} />

      <StepsHandlerBtns
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
    </>
  );
}
