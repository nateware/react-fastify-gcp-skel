import { QueryClient } from "@tanstack/react-query";

/**
 * Create and configure the TanStack Query client.
 * This is the central state management for server data.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
    },
  },
});
