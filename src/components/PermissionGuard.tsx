import { PropsWithChildren, useMemo } from 'react';
import { AuthGuard, AuthGuardMessages } from '@/components/AuthGuard';
import { useForcedAuth } from '@/hooks/useForcedAuth';
import { PermissionService, PermRoles } from '@authapex/core';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Typography } from 'gtomy-lib';

export interface PermissionMessages {
  userMissingRole: string;
}

export interface PermissionGuardProps extends PropsWithChildren {
  messages: AuthGuardMessages & PermissionMessages;
  requiredRole: PermRoles;
}

export function PermissionGuard({ children, ...props }: PermissionGuardProps) {
  const { messages } = props;
  return (
    <AuthGuard messages={messages}>
      <PermissionGuardInnter {...props}>{children}</PermissionGuardInnter>
    </AuthGuard>
  );
}

function PermissionGuardInnter({ children, messages, requiredRole }: PermissionGuardProps) {
  const { user } = useForcedAuth();
  const { app } = useAuthContext();
  const permissionService = useMemo(() => new PermissionService(app), [app]);

  if (permissionService.hasPermission(user, requiredRole)) {
    return <Typography as="div">{messages.userMissingRole}</Typography>;
  }

  return children;
}
