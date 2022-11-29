export type UserTypeProps = {
  email: string;
  password: string;
};

export type CreateUserTypeProps = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
};

export type MessagesTypeProps = {
  id: string;
  message: string;
  userId: string;
};

export type ResponseCreateUserType = {
  message: string;
  ok: boolean;
};
