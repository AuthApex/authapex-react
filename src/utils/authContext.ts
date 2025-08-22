import { createContext } from 'react';

export interface AuthContext {
  authApi: string;
  app: string;
  redirectUrl: string;
  backendApi: string;
  logoutPath: string;
  userPath: string;
}

export const authContext = createContext<AuthContext>(null!);
