import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../index.css?url";
import { db } from "../lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import Header from "@/components/header";

const fallbackTitle = "1000+ Creators from Miami";
export const Route = createRootRoute({
  // Static defaults
  head: ({ loaderData }) => {
    return {
      meta: [
        {
          title: loaderData?.title ?? fallbackTitle,
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    };
  },

  // SSR Loader
  loader: async () => {
    try {
      const snap = await getDoc(doc(db, "pages", "home"));
      const title = snap.exists()
        ? (snap.data().title as string | undefined)
        : undefined;
      return { title: title ?? "Fallback Title" };
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
        <Header />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
