const COLORS = ["40a1fd", "f2d93e", "f8c8c3", "d33335"];

export default function Colors({ colorChangeHandler, selectedColor }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {COLORS.map((color) => (
        <div
          key={color}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: `#${color}`,
            borderRadius: "50%",
            border: selectedColor === color && "3px solid #dedede",
            cursor: "pointer",
          }}
          onClick={() => colorChangeHandler(color)}
        ></div>
      ))}
    </div>
  );
}
