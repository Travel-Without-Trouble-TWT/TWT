export interface IUser {
  nickname: string;
  email: string;
  profile: string;
}

export interface ILoginResponse {
  status: string;
  accessToken: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface BasicResponse {
  status: string;
  message: string;
}
