import { useContext } from 'react';
import { AuthContext, authContext } from '@/utils/authContext';

export function useAuthContext(): AuthContext {
  return useContext(authContext);
}
