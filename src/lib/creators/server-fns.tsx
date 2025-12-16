import { createServerFn } from "@tanstack/react-start";

import z from "zod";
import { formSchema } from "./schemas/creators-apply-shared";
import { ApiOk } from "../server-only/errors/api-error";
import { findCreators } from "./creators-collection";
import { notFound } from "@tanstack/react-router";
 
 

 export const findCreatorByToken = createServerFn({method: "GET"}).inputValidator(z.string()).handler( async({data: confirmToken} )=>{
  const creators = await findCreators({
       limit: 1,
       where: [
         {
           field: "confirmToken",
           op: "==",
           value: confirmToken,
         },
       ],
     });
     if (creators.length === 0) {
       throw notFound();
     }
 
     const creator = creators[0];

     return creator
 })

// ---------- Convenient TS exports ----------
export type requestSubscriptionInput = z.infer<typeof formSchema>;
export type requestSubscriptionResult = ApiOk;
