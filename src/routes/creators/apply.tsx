import { createFileRoute } from "@tanstack/react-router";
import CreatorsApplyPage from "@/pages/creators-apply";
export const Route = createFileRoute("/creators/apply")({
  component: CreatorsApplyPage,
});
