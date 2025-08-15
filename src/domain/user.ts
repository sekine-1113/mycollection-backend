import { User } from '../entity/user';
import { UserProfile } from '../entity/userProfile';
import { Expand } from '../types';

export type AggregateUser = {
  user: User;
  profile: UserProfile;
};

export type CreateUser = {
  user: Expand<Omit<User, 'id' | 'publicId' | 'createdAt' | 'updatedAt'>>;
  profile: Omit<UserProfile, 'userId'>;
};

export const createUserWithProfile = (input: CreateUser) => {
  const user: User = {
    id: 0,
    publicId: '',
    email: input.user.email,
    username: input.user.username,
    firebaseUid: input.user.firebaseUid,
    roleId: input.user.roleId,
    profileId: input.user.profileId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const profile: UserProfile = {
    userId: user.id,
    iconUrl: input.profile.iconUrl,
    displayName: input.profile.displayName,
    isPublic: input.profile.isPublic,
  };
  return { user, profile };
};
