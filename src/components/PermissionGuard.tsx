import { PropsWithChildren, useMemo } from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { useForcedAuth } from '@/hooks/useForcedAuth';
import { PermissionService, PermRoles } from '@authapex/core';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Typography } from 'gtomy-lib';

export interface PermissionGuardProps extends PropsWithChildren {
  displayStates?: boolean;
  requiredRole: PermRoles;
}

export function PermissionGuard({ children, displayStates, ...props }: PermissionGuardProps) {
  return (
    <AuthGuard displayStates={displayStates}>
      <PermissionGuardInnter displayStates={displayStates} {...props}>
        {children}
      </PermissionGuardInnter>
    </AuthGuard>
  );
}

function PermissionGuardInnter({ children, requiredRole, displayStates }: PermissionGuardProps) {
  const { translations } = useAuthContext();
  const { user } = useForcedAuth();
  const { app } = useAuthContext();
  const permissionService = useMemo(() => new PermissionService(app), [app]);

  if (!permissionService.hasPermission(user, requiredRole)) {
    if (!displayStates) {
      return null;
    }
    return <Typography as="div">{translations.permissionGuard.userMissingRole}</Typography>;
  }

  return children;
}
