"use client";

export default function StepsHandlerBtns({ setCurrentStep, currentStep }) {
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const backStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        {currentStep < 3 && (
          <>
            <button
              style={{
                width: "100%",
                height: "35px",
                marginRight: "5px",
                border: "1px solid #dedede",
                borderRadius: "4px",
                color: "var(--text-color)",
              }}
              onClick={nextStep}
            >
              Saltar
            </button>
            <button
              style={{
                width: "100%",
                height: "35px",
                marginRight: "5px",
                border: "1px solid #8C52FF",
                borderRadius: "4px",
                color: "#fff",
                background: "#8C52FF",
              }}
              onClick={nextStep}
            >
              Continuar
            </button>
          </>
        )}
      </div>

      {currentStep > 1 && (
        <button
          style={{
            marginTop: "10px",
            height: "35px",
            border: "1px solid #dedede",
            borderRadius: "4px",
            color: "var(--text-color)",
          }}
          onClick={backStep}
        >
          Volver al paso anterior
        </button>
      )}
    </div>
  );
}
