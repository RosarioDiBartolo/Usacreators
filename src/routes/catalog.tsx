 
import TagsExample from "@/components/tags-example";
import { createFileRoute } from "@tanstack/react-router";

type Creator = { id: string; name: string };

export const Route = createFileRoute("/catalog")({
   
  component: CatalogPage,
});

function CatalogPage() {
   return (
    <main>
      <TagsExample />
    </main>
  );
}
