import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../index.css?url"; 
import Header from "@/components/header";
import { getLegalVersions } from "@/lib/legal/utils";
import { getPlatformMeta } from "@/lib/meta";
import { Toaster } from "sonner";

const fallbackTitle = "1000+ Creators from Miami";
export const Route = createRootRoute({
  // Static defaults
  head: ({ loaderData }) => {
    if (!loaderData){
      return {}
    }
    const {meta} = loaderData
    
    return {
      meta: [
        {
          
        },
        {
          title: meta?.title ?? fallbackTitle,
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      links: [{ rel: "stylesheet", href: appCss }, {
        rel: "icon", href : "/favicon.svg"
      }],
    };
  },

  // SSR Loader
  loader: async () => {
    try {

      const legal = await getLegalVersions()
      const meta = await getPlatformMeta()
       
      return { legal, meta };
    } catch (err) {
      console.error(err);
    }
  },

  staleTime: Infinity,
  gcTime: Infinity,

  component: RootComponent,
});

function RootComponent() {
  return (
    <html>
      <head>
        <HeadContent /> {/* ✅ gestisce *automaticamente* <title> + <meta> */}
      </head>
      <body>
        <Toaster />
        <Header />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
