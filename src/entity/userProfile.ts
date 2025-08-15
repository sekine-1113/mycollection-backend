export type UserProfile = {
  userId: number;
  iconUrl: string;
  displayName: string;
  isPublic: boolean;
};

export type NewUserProfile = Omit<UserProfile, 'userId'>;

export const createUserProfile = (
  userId: number,
  props: NewUserProfile,
): UserProfile => {
  return {
    userId,
    ...props,
  };
};
