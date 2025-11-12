import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getLegalVersions } from "./utils";
export const versionQuery = queryOptions({
  queryKey: ["policy"],
  queryFn: () => getLegalVersions(),
});
export const useCurrentLegal = () => useSuspenseQuery(versionQuery);
