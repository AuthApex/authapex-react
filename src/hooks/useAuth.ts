import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { showToast } from 'gtomy-lib';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { authApexQueryClient } from '@/utils/queryClient';
import axios from 'axios';
import { useAuthContext } from '@/hooks/useAuthContext';
import { AuthorizationService, User } from '@authapex/core';

export interface UseAuthBase {
  logout: () => Promise<void>;
  login: () => void;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<User | null | undefined, Error>>;
}

export interface UseAuthLoadedNotLoggedIn extends UseAuthBase {
  isAuthenticated: false;
  user: null;
  status: 'success';
  error: null;
}

export interface UseAuthLoadedLoggedIn extends UseAuthBase {
  isAuthenticated: true;
  user: User;
  status: 'success';
  error: null;
}

export interface UseAuthError extends UseAuthBase {
  isAuthenticated: null;
  user: null;
  status: 'error';
  error: Error;
}

export interface UseAuthLoading extends UseAuthBase {
  isAuthenticated: null;
  user: null;
  status: 'pending';
  error: null;
}

export type UseAuth = UseAuthLoadedNotLoggedIn | UseAuthLoadedLoggedIn | UseAuthError | UseAuthLoading;

async function getUser(backendApi: string, userPath: string) {
  return axios
    .get<User>(backendApi + userPath)
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
  const { backendApi, logoutPath, userPath, authApi, app, redirectUrl, translations } = useAuthContext();
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
        message: translations.errors.error,
      });
    }
  }, [status, translations]);

  const login = useCallback(() => {
    window.location.assign(authorizationService.createAuthorizeUrl());
  }, [authorizationService]);

  const logout = useCallback(async () => {
    await axios.post(backendApi + logoutPath, undefined).catch((error) => console.error(error));
    authApexQueryClient.getQueryCache().clear();
    await refetch();
  }, [backendApi, logoutPath, refetch]);

  return useMemo(() => {
    if (status === 'error') {
      return {
        user: null,
        isAuthenticated: null,
        status: 'error',
        error,
        refetch,
        login,
        logout,
      };
    }
    if (status === 'pending') {
      return {
        user: null,
        isAuthenticated: null,
        status: 'pending',
        error: null,
        refetch,
        logout,
        login,
      };
    }
    if (data) {
      return {
        user: data,
        isAuthenticated: true,
        status: 'success',
        error: null,
        logout,
        login,
        refetch,
      };
    } else {
      return {
        user: null,
        isAuthenticated: false,
        status: 'success',
        error: null,
        logout,
        login,
        refetch,
      };
    }
  }, [data, error, login, logout, refetch, status]);
}
