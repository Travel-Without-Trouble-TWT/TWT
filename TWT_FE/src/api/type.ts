export interface PageProps {
  content: any;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: object;
  size: number;
  sort: object;
  totalElements: number;
  totalPages: number;
}

export interface SchedulesProps {
  id: number;
  scheduleImageUrl: string | string[];
  nickName: string;
  profileUrl: string;
  scheduleName: string;
  startAt: string;
  endAt: string;
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

export interface postScheduleProps {
  id: number;
  scheduleName: string;
  member: IUser[];
  travelPlace: string;
  startAt: string;
  endAt: string;
  days: number[];
  scheduleImageUrl: string | null;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface JoinProps {
  nickName: string;
  email: string;
  verificationCode?: string;
  password: string;
  confirmPw?: string;
}

export interface EmittersProps {
  id: number;
  message: string;
}
