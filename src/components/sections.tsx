import BrandSection from "./brand-section";
import CreatorsSection from "./creators-section";
import { Comparison, ComparisonItem, ComparisonHandle } from "./ui/comparision";

function Sections() {
  return (
    <div className=" relative  mt-42  ">
      <Comparison className="  h-[120vh] md:h-[160vh] lg:h-[100vh]   flex items-center    ">
        <ComparisonItem className=" py-22" position="left">
          <BrandSection />
        </ComparisonItem>
        <ComparisonItem className=" py-22" position="right">
          <CreatorsSection />
        </ComparisonItem>
        <ComparisonHandle />
      </Comparison>
    </div>
  );
}

export default Sections;
