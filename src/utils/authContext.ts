import { createContext } from 'react';

export interface AuthContextTranslations {
  genericError: string;
  authGuard: {
    userNotLoggedIn: string;
    loading: string;
  };
  permissionGuard: {
    userMissingRole: string;
  };
}

export interface AuthContext {
  authApi: string;
  app: string;
  redirectUrl: string;
  backendApi: string;
  logoutPath: string;
  userPath: string;
  translations: AuthContextTranslations;
}

export const authContext = createContext<AuthContext>(null!);
