import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const handleGoogleLogin = () => {
    authClient.signIn.social({ provider: "google" });
  };

  const handleAppleLogin = () => {
    authClient.signIn.social({ provider: "apple" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow ring-1 ring-gray-300 hover:bg-gray-50"
      >
        Continue with Google
      </button>
      <button
        type="button"
        onClick={handleAppleLogin}
        className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white shadow hover:bg-gray-800"
      >
        Continue with Apple
      </button>
    </div>
  );
}
