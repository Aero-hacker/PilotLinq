import { QueryClient } from "@tanstack/react-query";

const queryConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed requests twice
      refetchOnWindowFocus: true, // Refetch on window focus
      staleTime: 1000 * 60 * 1, // Data stays fresh for 1 minute
      // cacheTime: 1000 * 60 * 10, // Uncomment to cache data for 10 minutes
    },
  },
});

export default queryConfig;
