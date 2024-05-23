import StepsHandlerBtns from "../../StepsHandlerBtns";
import Product from "./_components/Product";

export default function ThirdStep({ setCurrentStep, currentStep, petData }) {
  return (
    <>
      <div
        style={{
          background: "#fff",
          overflowY: "auto", // Apply overflow-y: auto to the blue div only

          border: "1px solid #dedede",
          borderRadius: "4px",
          backgroundColor: "#dedede",
        }}
      >
        <Product
          selectedProduct={"mug"}
          productPSDFile={"test.psd"}
          productURL={"mug"}
          productImageUrl={
            "https://xyzstorage.store/products%2Fmugs%2F64ef87cba6fe6b117e7aaab6%2Fpreviews%2Fmug(v2).png"
          }
          productName={"Taza de cerámica 325 ml"}
          productPrice={"15.500 COP"}
          petData={petData}
        ></Product>

        <Product
          selectedProduct={"mug mágico"}
          productPSDFile={"test.psd"}
          productURL={"magic-mug"}
          productImageUrl={
            "https://xyzstorage.store/products%2Fmugs%2F652e32dfbcfee2bb108da386%2Fpreviews%2Fmagicmug.webp"
          }
          productName={"Taza de cerámica mágica 325 ml"}
          productPrice={"19.500 COP"}
          petData={petData}
        ></Product>
      </div>
      <StepsHandlerBtns
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
      />
    </>
  );
}
