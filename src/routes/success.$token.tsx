import { createFileRoute, redirect } from "@tanstack/react-router";
import SuccessPage from "@/pages/success";
import {
  confirmSubscription,
  findCreatorByToken,
} from "@/lib/creators/server-fns";

const confirmationInFlight = new Set<string>();

const RouteComponent = () => {
  const data = Route.useLoaderData();

  return <SuccessPage {...data} />;
};

export const Route = createFileRoute("/success/$token")({
  loader: async ({ params: { token } }) => {
    const creator = await findCreatorByToken({ data: token });

    if (creator.status === "confirmed") {
      throw redirect({
        href: "/",
      });
    }

    let confirmationError: string | undefined;

    if (!confirmationInFlight.has(creator.id)) {
      confirmationInFlight.add(creator.id);

      try {
        await confirmSubscription({ data: creator.id });
      } catch (error) {
        console.error("Failed to confirm subscription", error);
        confirmationError =
          "We couldn’t confirm your subscription right now. Please try again.";
      } finally {
        confirmationInFlight.delete(creator.id);
      }
    }

    return {
      creator: confirmationError ? creator : { ...creator, status: "confirmed" },
      confirmationError,
    };
  },
  component: RouteComponent,
});
