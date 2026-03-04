import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome back, {session?.user?.name ?? ""}!</h1>
    </div>
  );
}
