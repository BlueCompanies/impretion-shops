import general from "@/app/_lib/designs/general.json";

export default function DesignsList({
  designPSDId,
  assignDesingToProductHandler,
  loadingDesign,
  clientSession,
}) {
  return (
    <>
      {general.map((design, index) => (
        <div key={design.designPSDId}>
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
            key={design.designPSDId}
          ></img>
        </div>
      ))}
    </>
  );
}
