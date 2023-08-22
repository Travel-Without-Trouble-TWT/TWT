export interface IUser {
  nickName: string;
  email: string;
  profilUrl: string;
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

export interface VerifyResponse extends BasicResponse {
  verificationCode: string;
}
