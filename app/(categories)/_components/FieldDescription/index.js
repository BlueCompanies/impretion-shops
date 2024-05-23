export const runtime = "edge";

export default function FieldDescription({
  bgColor,
  textColor,
  borderRadius,
  marginTop,
  children,
}) {
  return (
    <div
      style={{
        background: bgColor || "#8C52FF",
        color: textColor || "#fff",
        marginBottom: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: borderRadius || "4px",
        padding: "5px",
        marginTop: marginTop || "0px",
      }}
    >
      <div
        style={{
          color: "#555555",
          fontSize: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src="/icons/modals-and-messages/info.svg"
            style={{ marginRight: "5px", width: "22px" }}
          ></img>
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}
