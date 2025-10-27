import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

interface CarouselItemProps {
  title: string
  description: string
  image?: string
}

export function CarouselItem({ title, description, image }: CarouselItemProps) {
  return (
    <Card className=" w-full overflow-hidden  mx-auto !max-w-none shadow-xl border border-border/60 flex flex-col">
      {image && (
        <img
          src={image}
          alt={title}
          className=" flex-1 h-full w-full object-cover"
        />
      )}
      <div className=" text-center w-full absolute bottom-0 " >

        <CardHeader>
          <CardTitle className=" font-semibold">{title}</CardTitle>
          <p className="text-lg text-background">{description}</p>

        </CardHeader>
      </div>
    </Card>
  )
}
