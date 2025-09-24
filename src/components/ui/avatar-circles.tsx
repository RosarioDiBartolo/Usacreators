 
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"


interface AvatarCirclesProps {
className?: string
numPeople?: number
avatarUrls: string[]
}


export const AvatarCircles = ({ numPeople, className, avatarUrls }: AvatarCirclesProps) => {
return (
<motion.div layout className={cn("z-10 flex -space-x-3 rtl:space-x-reverse", className)}>
{avatarUrls.map((url, index) => (
<motion.img
key={index}
className="shadow-xl h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
src={url}
width={40}
height={40}
alt={`Avatar ${index + 1}`}
initial={{ scale: 0, y: 10, opacity: 0 }}
animate={{ scale: 1, y: 0, opacity: 1 }}
transition={{ duration: 0.4,  }}
whileHover={{ scale: 1.15, rotate: 3 }}
/>
))}


<motion.a
className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
href=""
whileHover={{ scale: 1.1, rotate: -3 }}
whileTap={{ scale: 0.95 }}
>
+{numPeople}
</motion.a>
</motion.div>
)
}