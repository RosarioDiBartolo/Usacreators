import { createFileRoute } from "@tanstack/react-router";
import SuccessPage from "@/pages/success";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
});
