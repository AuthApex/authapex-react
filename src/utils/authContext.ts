import { createContext } from 'react';
import { ErrorTranslations } from 'gtomy-lib';

export interface AuthContextTranslations {
  errors: ErrorTranslations;
  authGuard: {
    userNotLoggedIn: string;
    loadingMessage?: string;
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
