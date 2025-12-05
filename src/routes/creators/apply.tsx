import { createFileRoute } from "@tanstack/react-router";
import CreatorsApplyPage from "@/pages/apply-creator";
export const Route = createFileRoute("/creators/apply")({
  component: CreatorsApplyPage,
});
