import { ScrollContainer, SnapItem } from "./snap";

const Carousel = () => {
  return (
    <ScrollContainer 
      
    edgePadding={72}>
      {[...Array(10)].map((_, i) => (
        <SnapItem key={i} debug>
          <div className="h-[220px] w-[320px] shrink-0 rounded-xl border bg-secondary text-secondary-foreground" >
            
          </div>
        </SnapItem>
      ))}
    </ScrollContainer>
  );
};

export default Carousel;
