// Shared types between frontend and backend

/** User object returned by /api/auth/me and used in the frontend */
export interface AppUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

/** API error shape */
export interface ApiError {
  error: string;
  message?: string;
}

/** App configuration constants */
export const APP_NAME = "MyApp";
