import { creatorsQueryOptions } from "@/lib/creators/get-creators";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/catalog")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(creatorsQueryOptions),

  component: CatalogPage,
});

function CatalogPage() {
  const { data } = useSuspenseQuery(creatorsQueryOptions);

  return (
    <main>
      <h1>Creator Catalog</h1>
      {data?.map((creator) => (
        <div key={creator.id}>
          <h2>{creator.name}</h2>
          <p>{creator.bio}</p>
        </div>
      ))}
    </main>
  );
}
