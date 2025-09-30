import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { showToast } from 'gtomy-lib';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { authApexQueryClient } from '@/utils/queryClient';
import axios from 'axios';
import { useAuthContext } from '@/hooks/useAuthContext';
import { AuthorizationService, User } from '@authapex/core';

export interface UseAuth {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  logout: () => Promise<void>;
  login: () => void;
  error: Error | null;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<User | null | undefined, Error>>;
}

async function getUser(backendApi: string, userPath: string) {
  return axios
    .get<User>(backendApi + userPath, { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return null;
        }
      }
      throw error;
    });
}

// TODO: refresh token support
export function useAuth(): UseAuth {
  const { backendApi, logoutPath, userPath, authApi, app, redirectUrl } = useAuthContext();
  const { status, data, error, refetch } = useQuery(
    {
      queryKey: [backendApi, userPath],
      queryFn: () => getUser(backendApi, userPath),
    },
    authApexQueryClient
  );
  const authorizationService = useMemo(
    () => new AuthorizationService(authApi, app, redirectUrl),
    [app, authApi, redirectUrl]
  );

  useEffect(() => {
    if (status === 'error') {
      showToast({
        icon: ExclamationCircleIcon,
        iconColor: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  }, [status]);

  const login = () => {
    window.location.assign(authorizationService.createAuthorizeUrl());
  };

  const logout = async () => {
    await axios
      .post(backendApi + logoutPath, undefined, { withCredentials: true })
      .catch((error) => console.error(error));
    authApexQueryClient.getQueryCache().clear();
    await refetch();
  };

  return {
    user: data ?? null,
    isLoading: status === 'pending',
    isError: status === 'error',
    logout,
    login,
    error,
    refetch,
  };
}
