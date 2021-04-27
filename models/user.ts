export type User = {
  uid: string;
  username: string;
  email: string;
  emailVerified: boolean;
};

export type UpdateUser = {
  username?: string;
  playerId?: string;
};
