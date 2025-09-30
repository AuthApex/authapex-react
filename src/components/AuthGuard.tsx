import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { ErrorState, LoadingState, Typography } from 'gtomy-lib';
import { useAuthContext } from '@/hooks/useAuthContext';

export interface AuthGuardProps extends PropsWithChildren {
  displayMessages?: boolean;
}

export function AuthGuard({ displayMessages, children }: AuthGuardProps) {
  const { translations } = useAuthContext();
  const { isLoading, isError, user, error, refetch } = useAuth();

  if (isLoading) {
    if (!displayMessages) {
      return null;
    }
    return <LoadingState message={translations.authGuard.loading} showLoading />;
  }

  if (isError) {
    if (!displayMessages) {
      return null;
    }
    // TODO: Add translation
    return (
      <ErrorState
        error={error}
        retry={refetch}
        showRetry
        translation={{
          error: 'Error occured when loading user.',
          retry: 'Try again',
          badGateway: 'Server unreachable',
          noPermission: "You don't have permission to view this.",
        }}
      />
    );
  }

  if (!user) {
    if (!displayMessages) {
      return null;
    }
    return <Typography as="div">{translations.authGuard.userNotLoggedIn}</Typography>;
  }

  return children;
}
