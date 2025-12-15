import { createFileRoute, notFound } from "@tanstack/react-router";
import SuccessPage from "@/pages/success";
import { getCreator } from "@/lib/creators/utils";
const RouteComponent = ()=>{
     const data = Route.useLoaderData()
    return  <SuccessPage {...data}  />
  }
export const Route = createFileRoute("/success/$uid")({
  loader: async ({params: {uid}})=>{
    const user = await getCreator({data: {id: uid}})
    if (!user ){
      throw notFound( )
    }
    return {user}
  },
  component: RouteComponent
});
