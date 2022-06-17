export type UserRoom = {
  username: string;
  room: string;
};

export type Messages = {
  username: string;
  room: string;
  message: string;
  time: string | undefined;
};
