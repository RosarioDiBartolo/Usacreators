import BrandSection from "./brand-section";
import CreatorsSection from "./creators-section";
import { Comparison, ComparisonItem, ComparisonHandle } from "./ui/comparision";
import { Feature } from "./ui/feature-with-image-comparison";

import { Tabs } from "./ui/tabs";
const tabs = [
  {
    title: "Brand's section",
    value: "product",
    content: <BrandSection />,
  },
  {
    title: "Creator's section",
    value: "services",
    content: <CreatorsSection />,
  },
];

function Sections() {
  return (
    <div className=" relative   ">

  <Comparison className="aspect-video  h-[180vh] ">
    
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
