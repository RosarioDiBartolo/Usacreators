import z from "zod"
import { formSteps } from "../creators/schemas/creators-apply-shared"

 const { name, email,   phone, locationYesNo } = formSteps.personal.schema.shape
 const  {niches} = formSteps.details.schema.shape
 
  export const brevoContactSchema = z.object({ name, email, niches, locationYesNo, phone, docId: z.string() } ).strip()