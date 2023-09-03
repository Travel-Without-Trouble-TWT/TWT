import { StringLiteral } from 'typescript';

export interface Top10Props {
  id: number;
  placeName: string;
  placeType: string;
  placeLocation: string;
  star: string; //number
  placeHeart: 0 | 1; //number
  placeImageUrl: string;
}

export interface ScheduleProps {
  id: number;
  scheduleImageUrl: string | string[];
  nickName: string;
  profileUrl: string;
  scheduleName: string;
  startAt: string;
  endAt: string;
}

export interface ReviewProps {
  id: number;
  createAt: string;
  nickName: string;
  reviewComment: string;
  reviewImageList: string[];
  star: number;
}

export interface DataProps {
  id: number;
  latitude: number;
  longitude: number;
  placeAddress: string;
  placeCallNumber: string;
  placeDescription: string;
  placeHeart: number;
  placeImageUrl: string;
  placeLocation: string;
  placeName: string;
  placeType: string;
  reviewNum: number;
  star: number;
  totalStar: number;
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
