import { DestinationCard } from "../ui/image-card";
import { ScrollContainer, ScrollContent, SnapItem } from "./snap";
const edgePadding = 72;
const Carousel = () => {
  return (
    <ScrollContainer className=" h-[600px] ">
      <ScrollContent>
        <div style={{ width: edgePadding, flex: "0 0 auto" }} aria-hidden />
        {[...Array(10)].map((_, i) => (
          <SnapItem key={i} debug>
            <div className="h-[220px] w-[320px] shrink-0 rounded-xl border bg-secondary text-secondary-foreground">
              <DestinationCard
                imageUrl="https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1887"
                location="Dubai"
                flag="🇦🇪"
                stats="2,345 Hotels • 54 Packages"
                href="#"
                // A rich, twilight purple HSL value
                themeColor="250 50% 30%"
              />
            </div>
          </SnapItem>
        ))}
        <div style={{ width: edgePadding, flex: "0 0 auto" }} aria-hidden />
      </ScrollContent>
    </ScrollContainer>
  );
};

export default Carousel;
