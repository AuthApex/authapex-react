import { twMerge } from 'tailwind-merge';
import { ComponentProps } from 'react';

export interface ProfileImageProps extends ComponentProps<'img'> {
  imageUrl?: string;
  srcType?: string;
  defaultProfileImageId?: string;
  user: {
    displayName: string;
    profileImageId?: string | null;
    profileImageUrl?: string | null;
  };
}

export function ProfileImage({
  user,
  className,
  imageUrl = '/images',
  srcType = 'profile',
  defaultProfileImageId = '5b46b9fd-8d41-4fbc-987f-3e7fd0e99600',
  ...props
}: ProfileImageProps) {
  if (user.profileImageUrl != null && user.profileImageId == null) {
    return (
      <img
        src={user.profileImageUrl}
        alt={user.displayName.substring(0, 1)}
        className={twMerge('mask mask-squircle object-cover', className)}
        {...props}
      />
    );
  }

  return (
    <img
      src={imageUrl + `/${user.profileImageId ?? defaultProfileImageId}/${srcType}`}
      alt={user.displayName.substring(0, 1)}
      className={twMerge('mask mask-squircle object-cover', className)}
      {...props}
    />
  );
}
