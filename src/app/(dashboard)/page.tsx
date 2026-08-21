import { protectServer } from "@/features/auth/utils";

import { CommerceOperationsDashboard } from "./commerce-operations-dashboard";

export default async function Home() {
  await protectServer();

  return <CommerceOperationsDashboard />;
}
