import { useQuery } from '@tanstack/react-query';
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
}

export function useAuth(): UseAuth {
  const { backendApi, logoutPath, userPath, authApi, app, redirectUrl } = useAuthContext();
  const { status, data } = useQuery(
    {
      queryKey: [backendApi, userPath],
      queryFn: () =>
        axios.get<User>(backendApi + userPath, { withCredentials: true }).then((response) => response.data),
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
    await axios.post(backendApi + logoutPath).catch((error) => console.error(error));
    authApexQueryClient.getQueryCache().clear();
  };

  return {
    user: data ?? null,
    isLoading: status === 'pending',
    isError: status === 'error',
    logout,
    login,
  };
}
