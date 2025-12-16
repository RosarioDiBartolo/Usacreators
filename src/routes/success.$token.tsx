import { createFileRoute  } from "@tanstack/react-router";
import SuccessPage from "@/pages/success"; 
import { findCreatorByToken } from "@/lib/creators/server-fns";
 const RouteComponent = ()=>{
     const data = Route.useLoaderData()
    return  <SuccessPage {...data}  />
  }
export const Route = createFileRoute("/success/$token")({
  loader: async ({params: {token}})=>{
    const creator = await findCreatorByToken({data: token})
     
    return {creator}
  },
  component: RouteComponent
});
