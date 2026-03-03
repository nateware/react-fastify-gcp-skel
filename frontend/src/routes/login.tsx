import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: LoginPage,
});

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>Google</title>
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.26c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>Apple</title>
      <path
        d="M14.94 14.378c-.325.75-.48 1.085-.897 1.752-.582.93-1.404 2.088-2.42 2.098-1.134.012-1.427-.738-2.967-.728-1.54.01-1.86.744-2.994.732-1.017-.01-1.794-1.042-2.376-1.972C1.6 13.534 1.394 10.57 2.614 8.991c.866-1.123 2.241-1.78 3.518-1.78 1.308 0 2.13.742 3.213.742 1.05 0 1.69-.743 3.205-.743 1.138 0 2.367.62 3.23 1.69-2.837 1.555-2.378 5.608.16 6.478zM11.39 5.2c.45-.578.793-1.393.67-2.228-.737.05-1.6.52-2.104 1.132-.46.558-.838 1.382-.691 2.178.806.025 1.64-.453 2.125-1.082z"
        fill="currentColor"
      />
    </svg>
  );
}

function LoginPage() {
  const { redirect } = Route.useSearch();
  const redirectPath = redirect || "/dashboard";
  const callbackURL = `${window.location.origin}${redirectPath}`;

  const handleGoogleLogin = () => {
    authClient.signIn.social({ provider: "google", callbackURL });
  };

  const handleAppleLogin = () => {
    authClient.signIn.social({ provider: "apple", callbackURL });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <div className="flex w-72 flex-col gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={handleAppleLogin}
          className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
        >
          <AppleIcon />
          Continue with Apple
        </button>
      </div>
    </div>
  );
}
