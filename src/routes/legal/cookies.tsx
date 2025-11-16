import { createFileRoute } from '@tanstack/react-router'
import cookiesData from "@/assets/legal/cookies/2025-01-01.json";
import LegalPage from '@/components/legal/legal-page';

export const Route = createFileRoute('/legal/cookies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LegalPage {...cookiesData} title="Cookies" />;
}
