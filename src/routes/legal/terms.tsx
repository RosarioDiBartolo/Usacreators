import LegalPage from "@/components/legal/legal-page";
import { createFileRoute } from "@tanstack/react-router";
import termsData from "@/assets/legal/terms/2025-01-01.json";
export const Route = createFileRoute("/legal/terms")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LegalPage {...termsData} title="Terms and conditions" />;
}
