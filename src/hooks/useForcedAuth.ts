import { useAuth, UseAuth } from '@/hooks/useAuth';
import { User } from '@authapex/core';

export interface UseForcedAuth extends Omit<UseAuth, 'user'> {
  user: User;
}

export function useForcedAuth(): UseForcedAuth {
  const auth = useAuth();

  if (!auth.user) {
    throw new Error('User is not authenticated');
  }

  return {
    ...auth,
    user: auth.user,
  };
}
