 
import { createFileRoute } from "@tanstack/react-router";

type Creator = { id: string; name: string };

export const Route = createFileRoute("/catalog")({
  loader: async () => {
    // TODO: punta alla tua API reale
    const data: Creator[] = await fetch("/api/hello").then(r => r.json());
    return { creators: data };
  },
  component: CatalogPage,
});

function CatalogPage() {
  const { creators } = Route.useLoaderData() as { creators: Creator[] };
  return (
    <main>
      <h1>Catalog</h1>
      <ul>
        {creators.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </main>
  );
}
