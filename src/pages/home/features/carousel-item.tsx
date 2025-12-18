import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface CarouselItemProps {
  title: string;
  description: string;
  image?: string;
}

export function CarouselItem({ title, description, image }: CarouselItemProps) {
  return (
    <div className=" w-full overflow-hidden  max-w-4xl rounded-4xl  mx-auto   shadow-xl border border-border/60 flex flex-col">
      {image && (
        <div className="relative   flex-1 h-full w-full">
          <img
            src={image}
            alt={title}
            className="h-full blur-[2px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80"></div>
        </div>
      )}
   
        <div className=" p-8  w-full  max-w-3xl left-1/2   -translate-x-1/2 text-white absolute bottom-0    text-center ">
          <h3 className=" capitalize text-7xl leading-tight font-bold">{title}</h3>
          <p className="text-xl leading-normal  ">{description}</p>
        </div>
       
    </div>
  );
}
