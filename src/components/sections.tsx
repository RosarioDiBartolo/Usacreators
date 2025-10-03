import BrandSection from "./brand-section";
import CreatorsSection from "./creators-section";

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
    <div className=" h-screen relative">
      <Tabs tabs={tabs} containerClassName=" sticky top-32 justify-center" />
    </div>
  );
}

export default Sections;
