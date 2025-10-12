import BrandSection from "./brand-section";
import CreatorsSection from "./creators-section";
import { Comparison, ComparisonItem, ComparisonHandle } from "./ui/comparision";

function Sections() {
  return (
    <div className="   bg-gradient-to-br md:pt-10  ">
      <Comparison className=" border md:rounded-[100px]  bg-muted p-0   md:p-10 ">
        <div className="  h-[120vh] sm:h-[110vh]  md:h-[140vh] lg:h-[80vh] xl:h-[80vh] relative">
 
        <ComparisonItem className=" h-full" position="left">
          <BrandSection />
        </ComparisonItem>
        <ComparisonItem className="h-full" position="right">
          <CreatorsSection />
        </ComparisonItem>
        <ComparisonHandle />
        
        </div>
      </Comparison>
    </div>
  );
}

export default Sections;
