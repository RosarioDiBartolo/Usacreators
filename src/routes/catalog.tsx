import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { createFileRoute } from "@tanstack/react-router";
import CatalogPage from "@/pages/catalog";
export const Route = createFileRoute("/catalog")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(creatorsQueryOptions),

  component: CatalogPage,
});
 