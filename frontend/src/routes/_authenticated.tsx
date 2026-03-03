import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    // Check if user is authenticated
    const res = await fetch("/api/auth/get-session", { credentials: "include" });
    if (!res.ok) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
