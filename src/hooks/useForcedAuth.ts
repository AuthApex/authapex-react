import { useAuth, UseAuthLoadedLoggedIn } from '@/hooks/useAuth';
import { useMemo } from 'react';

export function useForcedAuth(): UseAuthLoadedLoggedIn {
  const auth = useAuth();

  return useMemo(() => {
    if (auth.status !== 'success' || !auth.isAuthenticated) {
      throw new Error('User is not authenticated');
    }

    return auth;
  }, [auth]);
}
