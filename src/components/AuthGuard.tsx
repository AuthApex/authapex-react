import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { ErrorState, LoadingState, Typography } from 'gtomy-lib';
import { useAuthContext } from '@/hooks/useAuthContext';

export interface AuthGuardProps extends PropsWithChildren {
  displayStates?: boolean;
}

export function AuthGuard({ displayStates, children }: AuthGuardProps) {
  const { translations } = useAuthContext();
  const { isLoading, isError, user, error, refetch } = useAuth();

  if (isLoading) {
    if (!displayStates) {
      return null;
    }
    return <LoadingState message={translations.authGuard.loadingMessage} />;
  }

  if (isError) {
    if (!displayStates) {
      return null;
    }
    return <ErrorState error={error} retry={refetch} showRetry translation={translations.errors} />;
  }

  if (!user) {
    if (!displayStates) {
      return null;
    }
    return <Typography as="div">{translations.authGuard.userNotLoggedIn}</Typography>;
  }

  return children;
}
