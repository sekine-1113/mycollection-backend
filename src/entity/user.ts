export type User = {
  id: number;
  publicId: string;
  email: string;
  username: string;
  firebaseUid: string;
  roleId: number;
  profileId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewUser = Omit<User, 'id' | 'publicId' | 'createdAt' | 'updatedAt'>;

export const createUser = (props: NewUser): User => {
  return {
    ...props,
    id: 0,
    publicId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};
