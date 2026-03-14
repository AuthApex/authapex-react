import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { useForcedAuth } from '@/hooks/useForcedAuth';
import { PermissionService, PermRoles } from '@authapex/core';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Icon, Typography } from 'gtomy-lib';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export interface PermissionGuardProps extends PropsWithChildren {
  displayStates?: boolean;
  requiredRole: PermRoles;
}

export function PermissionGuard({ children, displayStates, ...props }: PermissionGuardProps): ReactNode {
  return (
    <AuthGuard displayStates={displayStates}>
      <PermissionGuardInnter displayStates={displayStates} {...props}>
        {children}
      </PermissionGuardInnter>
    </AuthGuard>
  );
}

function PermissionGuardInnter({ children, requiredRole, displayStates }: PermissionGuardProps): ReactNode {
  const { translations } = useAuthContext();
  const { user } = useForcedAuth();
  const { app } = useAuthContext();
  const permissionService = useMemo(() => new PermissionService(app), [app]);

  if (!permissionService.hasPermission(user, requiredRole)) {
    if (!displayStates) {
      return null;
    }
    return (
      <div role="alert" className="alert alert-warning">
        <Icon icon={ExclamationTriangleIcon} size="lg" />
        <Typography>{translations.permissionGuard.userMissingRole}</Typography>
      </div>
    );
  }

  return children;
}
