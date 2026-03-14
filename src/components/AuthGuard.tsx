import { useAuth } from '@/hooks/useAuth';
import { PropsWithChildren, ReactNode } from 'react';
import { Icon, IconType, LoadingState, Typography } from 'gtomy-lib';
import { useAuthContext } from '@/hooks/useAuthContext';
import { ExclamationTriangleIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { isAxiosError } from 'axios';
import { twJoin } from 'tailwind-merge';

export interface AuthGuardProps extends PropsWithChildren {
  displayStates?: boolean;
}

export function AuthGuard({ displayStates, children }: AuthGuardProps): ReactNode {
  const { translations } = useAuthContext();
  const { status, isAuthenticated, error } = useAuth();

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
    let message = translations.errors.error;
    let color = 'alert-error';
    let icon: IconType = XCircleIcon;
    if (isAxiosError(error)) {
      if (error.response?.status === 502) {
        message = translations.errors.badGateway;
      }
      if (error.response?.status === 401 || error.response?.status === 403) {
        message = translations.errors.noPermission;
        color = 'alert-warning';
        icon = LockClosedIcon;
      }
    }
    return (
      <div role="alert" className={twJoin('alert', color)}>
        <Icon icon={icon} size="lg" />
        <Typography>{message}</Typography>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (!displayStates) {
      return null;
    }
    return (
      <div role="alert" className="alert alert-warning">
        <Icon icon={ExclamationTriangleIcon} size="lg" />
        <Typography>{translations.authGuard.userNotLoggedIn}</Typography>
      </div>
    );
  }

  return children;
}
