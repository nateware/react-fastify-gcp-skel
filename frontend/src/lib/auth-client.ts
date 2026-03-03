import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "",
  basePath: "/api/auth",
});

// Export hooks
export const { useSession, signIn, signOut, signUp } = authClient;
