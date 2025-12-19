import { motion } from "framer-motion"; 
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { 
  LucideProps,
} from "lucide-react"; 
import { ForwardRefExoticComponent, JSX, RefAttributes } from "react";


export interface FaqItem  {
    id: string;
    question: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    iconColor: string;
    answer: JSX.Element;
}


export default function FAQ({faqItems}:{faqItems: FaqItem[]}) {
  return (
     
     
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Accordion
          type="single"
          collapsible
          className=" space-y-5 w-full text-start"
        >
          {faqItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="   rounded-lg text-left    overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:bg-gradient-to-br hover:from-accent/10 hover:to-accent/15"
              >
                <AccordionTrigger className="
                 
                px-6 py-4
                flex justify-between items-center  ">
                  <div className=" flex gap-4 items-center">
                    <IconComponent
                      className={`${item.iconColor} w-5 h-5 flex-shrink-0 hidden md:block`}
                    />
                    <span className=" font-semibold    text-3xl
                    bg-text
            bg-linear-to-t from-orange-900 to-foreground 
                    ">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </motion.div>
   );
}
