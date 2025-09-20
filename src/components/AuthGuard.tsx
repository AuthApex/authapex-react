import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { ErrorState, LoadingState, Typography } from 'gtomy-lib';

export interface AuthGuardMessages {
  userNotLoggedIn: string;
  loading: string;
}

export interface AuthGuardProps extends PropsWithChildren {
  messages?: AuthGuardMessages;
}

export function AuthGuard({ messages, children }: AuthGuardProps) {
  const { isLoading, isError, user, error, refetch } = useAuth();

  if (isLoading) {
    if (!messages) {
      return null;
    }
    return <LoadingState message={messages.loading} showLoading />;
  }

  if (isError) {
    if (!messages) {
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
    if (!messages) {
      return null;
    }
    return <Typography as="div">{messages.userNotLoggedIn}</Typography>;
  }

  return children;
}
