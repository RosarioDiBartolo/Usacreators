import { createFileRoute } from '@tanstack/react-router'
import privacyData from "@/assets/legal/privacy/2025-01-01.json";
import LegalPage from '@/components/legal/legal-page';

export const Route = createFileRoute('/legal/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LegalPage {...privacyData} title="Privacy policies" />;
}
