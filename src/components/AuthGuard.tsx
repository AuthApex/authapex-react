import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren, ReactNode } from 'react';
import { ErrorState, LoadingState, Typography } from 'gtomy-lib';
import { useAuthContext } from '@/hooks/useAuthContext';

export interface AuthGuardProps extends PropsWithChildren {
  displayStates?: boolean;
}

export function AuthGuard({ displayStates, children }: AuthGuardProps): ReactNode {
  const { translations } = useAuthContext();
  const { status, isAuthenticated, error, refetch } = useAuth();

  if (status === 'pending') {
    if (!displayStates) {
      return null;
    }
    return <LoadingState message={translations.authGuard.loadingMessage} />;
  }

  if (status === 'error') {
    if (!displayStates) {
      return null;
    }
    return <ErrorState error={error} retry={refetch} showRetry translation={translations.errors} />;
  }

  if (!isAuthenticated) {
    if (!displayStates) {
      return null;
    }
    return <Typography as="div">{translations.authGuard.userNotLoggedIn}</Typography>;
  }

  return children;
}
