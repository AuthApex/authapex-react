import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

const authApexQuerySettings: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
};
export const authApexQueryClient = new QueryClient(authApexQuerySettings);
