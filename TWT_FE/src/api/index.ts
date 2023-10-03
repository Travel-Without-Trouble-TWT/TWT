import { authApi } from './auth';
import { PageProps } from './type';

//방문지 top10
export const getTop10Fn = async () => {
  const response = await authApi.get('/search/main'); //authAPI로 변경예정
  return response.data;
};

//스케쥴들
export const getSchedulesFn = async (page: number) => {
  const response = await authApi.get(`/search/schedule?pageNum=${page}`);
  return response.data;
};

//선택페이지 리스트들
export const getPlaceFn = async (
  type: string,
  location: string,
  page: number
) => {
  const response = await authApi.get<PageProps>(
    `/search/location?placeLocation=${location}&placeType=${type}&pageNum=${page}`
  );
  return response.data;
};

//마이페이지
export const getUserDataFn = async (
  category: string,
  page: number,
  placeLocation?: string
) => {
  let url = `/search/member/${category}?pageNum=${page}`;
  if (category === 'schedule') {
    url += `&placeLocation=${placeLocation}`;
  }
  const response = await authApi.get(url);
  return response.data;
};

//리뷰 리스트들
export const getPlaceReviewsFn = async (placeId: number, page: number) => {
  const response = await authApi.get<PageProps>(
    `/review/place?placeId=${placeId}&pageNum=${page}`
  );
  return response.data;
};

//해당 장소 정보
export const getPlaceInfoFn = async (placeId: number) => {
  const response = await authApi.get(`/search/detail?placeId=${placeId}`);
  return response.data;
};

//스케쥴 정보
export const getScheduleFn = async (scheduleId: number) => {
  const response = await authApi.get(`/schedule/info?scheduleId=${scheduleId}`);
  return response.data;
};

//유저 데이터
export const getUserInfoFn = async () => {
  const response = await authApi.get(`/member/info`);
  return response.data;
};

//일정 추가 => 기존 일정
export const getExistedSchedule = async (placeLocation: string) => {
  const response = await authApi.get(
    `/schedule/choose?placeLocation=${placeLocation}`
  );
  return response.data;
};

//주변 플레이스
export const getNearPlaces = async (placeId: number) => {
  const response = await authApi.get(`/search/near?placeId=${placeId}`);
  return response.data;
};

//post
export const postReviewFn = async (data: any, files: File | null) => {
  const formData = new FormData();

  const requestObj = {
    reviewComment: data.reviewComment,
    placeId: data.placeId,
    star: data.star,
  };

  const requestBlob = new Blob([JSON.stringify(requestObj)], {
    type: 'application/json',
  });

  formData.append('request', requestBlob);
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  const response = authApi.post('/review/place', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const postScheduleFn = async (data: any) => {
  const response = await authApi.post(`/schedule/create`, data);
  return response.data;
};

export const addScheduleFn = async (data: any) => {
  const response = await authApi.put(`/schedule/add`, data);
  return response.data;
};

export const changeScheduleFn = async (data: any) => {
  const response = await authApi.put(`/schedule/change`, data);
  return response.data;
};

export const fixScheduleTimeFn = async (data: any) => {
  const response = await authApi.put(`/daily/fix`, data);
  return response.data;
};

export const addLikeFn = async (placeId: number) => {
  const response = await authApi.post(`/member?placeId=${placeId}`);
  return response.data;
};

//delete
export const deleteScheduleFn = async (scheduleId: Number) => {
  const response = await authApi.delete(
    `/schedule/cancel?scheduleId=${scheduleId}`
  );
  return response.data;
};

export const deleteDailyScheduleFn = async (data: {
  dayScheduleId: number;
  index: number;
}) => {
  const response = await authApi.delete(`/daily/del`, { data });
  return response.data;
};
