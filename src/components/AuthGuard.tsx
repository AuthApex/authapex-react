import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren } from 'react';
import { LoadingState, Typography } from 'gtomy-lib';

export interface AuthGuardMessages {
  userNotLoggedIn: string;
  loading: string;
}

export interface AuthGuardProps extends PropsWithChildren {
  messages: AuthGuardMessages;
}

export function AuthGuard({ messages, children }: AuthGuardProps) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingState message={messages.loading} showLoading />;
  }

  if (!user) {
    return <Typography as="div">{messages.userNotLoggedIn}</Typography>;
  }
  return children;
}
