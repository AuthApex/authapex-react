import { PropsWithChildren } from 'react';
import { AuthContext, authContext } from '@/utils/authContext';

export interface AuthProviderProps extends PropsWithChildren {
  value: AuthContext;
}

export function AuthProvider({ children, value }: AuthProviderProps) {
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
