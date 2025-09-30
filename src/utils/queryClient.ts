import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const authApexQuerySettings: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (numberOfAttempts, error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          return false;
        }
        return numberOfAttempts < 3;
      },
    },
  },
};
export const authApexQueryClient = new QueryClient(authApexQuerySettings);
