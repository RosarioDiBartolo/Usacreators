import { createFileRoute, redirect  } from "@tanstack/react-router";
import SuccessPage from "@/pages/success"; 
import { confirmSubscription, findCreatorByToken } from "@/lib/creators/server-fns";
 const RouteComponent = ()=>{
     const data = Route.useLoaderData()
    return  <SuccessPage {...data}  />
  }
export const Route = createFileRoute("/success/$token")({
  loader: async ({params: {token}})=>{
    const creator = await findCreatorByToken({data: token})
    if(creator.status === "confirmed"){
      throw redirect({
        href: '/',
            })
    }else{
      confirmSubscription({  data: creator.id })
    }
    return {creator}
  },
  component: RouteComponent
});
