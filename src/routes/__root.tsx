import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import appCss from "../index.css?url";
import { getPlatformMeta } from "@/lib/meta";
import { Toaster } from "sonner";
import { type QueryClient } from "@tanstack/react-query";
import { ReactLenis } from 'lenis/react';
import { useRef } from "react";

const fallbackTitle = "1000+ Creators from Miami";
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    server: {},
    // Static defaults
    head: ({ loaderData }) => {
      if (!loaderData) {
        return {};
      }
      const { meta } = loaderData;

      return {
        meta: [
          {},
          {
            title: meta?.title ?? fallbackTitle,
          },
          { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" },
          
        ],
        links: [
          { rel: "stylesheet", href: appCss },
          {
            rel: "icon",
            href: "/favicon.svg",
          },
        ],
      };
    },

    // SSR Loader
    loader: async () => {
      const meta = await getPlatformMeta();
      return { meta };
    },

    staleTime: Infinity,
    gcTime: Infinity,

    component: RootComponent,
  }
);

function RootComponent() {

  const ref = useRef(null)
  return (
    <html>
      <head>
        <HeadContent /> {/* ✅ gestisce *automaticamente* <title> + <meta> */}
      </head>
      <ReactLenis root ref={ref}> 
      <body ref = {ref}>
        <Toaster />
        <Outlet />
        <Scripts />
      </body>
      </ReactLenis>
    </html>
  );
}
