import general from "@/app/_lib/designs/general.json";

export default function DesignsList({
  designPSDId,
  assignDesingToProductHandler,
  loadingDesign,
  clientSession,
}) {
  return (
    <>
      {general.map((design) => (
        <div key={design.designPSDId} style={{ position: "relative" }}>
          {designPSDId === design.designPSDId && (
            <div
              style={{
                position: "absolute",
                zIndex: 9999999,
                padding: "5px",
                background: "#000",
                opacity: "0.4",
                margin: "7px",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "12px",
              }}
            >
              Diseño seleccionado
            </div>
          )}
          <img
            src={design.designUrl}
            onClick={() => {
              if (
                !loadingDesign &&
                designPSDId !== design.designPSDId &&
                clientSession
              ) {
                assignDesingToProductHandler(
                  design.designPSDId,
                  design.designUrl,
                  ""
                );
              }
            }}
            style={{
              width: "100%",
              height: "135px",
              marginTop: "3px",
              borderRadius: "4px",
              objectFit: "cover",
              cursor: loadingDesign ? "not-allowed" : "pointer",
              opacity: loadingDesign ? 0.5 : 1,
            }}
          ></img>
        </div>
      ))}
    </>
  );
}
