export interface Top10Props {
  id: number;
  placeName: string;
  placeType: string;
  placeLocation: string;
  star: string; //number
  placeHeart: 0 | 1; //number
  placeImageUrl: string;
}

export interface ReviewProps {
  id: number;
  scheduleImageUrl: string | string[];
  nickName: string;
  profileUrl: string;
  scheduleName: string;
  startAt: string;
  endAt: string;
}
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
