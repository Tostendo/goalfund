export type User = {
  uid: string;
  username: string;
  email: string;
};

export type UpdateUser = {
  username?: string;
  playerId?: string;
};
