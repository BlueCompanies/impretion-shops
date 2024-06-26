import fathersDesigns from "@/app/_lib/designs/fathersDesigns.json";

export default function DesignsList({
  designId,
  assignDesingToProductHandler,
}) {
  return (
    <>
      {fathersDesigns.map((design, index) => (
        <img
          src={design.designUrl}
          onClick={() =>
            designId !== design.designId &&
            assignDesingToProductHandler(design.designId, design.designUrl)
          }
          style={{
            width: "100%",
            height: "135px",
            marginTop: "3px",
            borderRadius: "4px",
            objectFit: "cover",
          }}
          key={index}
        ></img>
      ))}
    </>
  );
}
