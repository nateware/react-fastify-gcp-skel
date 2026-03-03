import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="mt-4 text-lg text-muted-foreground">Your app is running.</p>
      <Link to="/login" className="mt-6 underline">
        Sign in
      </Link>
    </div>
  );
}
