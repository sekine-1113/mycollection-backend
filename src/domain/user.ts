import { User } from '../entity/user';
import { UserProfile } from '../entity/userProfile';
import { Expand } from '../types';

export type AggregateUser = {
  user: User;
  profile: Partial<UserProfile>;
};

export type CreateUserInput = {
  user: Expand<
    Omit<
      User,
      'id' | 'publicId' | 'roleId' | 'profileId' | 'createdAt' | 'updatedAt'
    >
  >;
  profile: Expand<Omit<UserProfile, 'userId'> | undefined>;
};

export const createUserWithProfile = (
  input: CreateUserInput,
): AggregateUser => {
  const user: User = {
    id: 0,
    publicId: '',
    email: input.user?.email,
    username: input.user?.username,
    firebaseUid: input.user.firebaseUid,
    roleId: 1,
    profileId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const profile: Partial<UserProfile> = {
    userId: user.id,
    iconUrl: input.profile?.iconUrl,
    displayName: input.profile?.displayName,
    isPublic: input.profile?.isPublic,
  };
  return { user, profile };
};
