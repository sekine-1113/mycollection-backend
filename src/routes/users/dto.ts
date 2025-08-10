type UserWithProfile = {
  publicId: string;
  profile: {
    iconUrl: string | null;
    displayName: string | null;
    isPublic: boolean;
  } | null;
};

export const toUserData = (user: UserWithProfile) => {
  return {
    public_id: user.publicId,
    profile: {
      icon_url: user.profile?.iconUrl,
      display_name: user.profile?.displayName,
      is_public: user.profile?.isPublic,
    },
  };
};
