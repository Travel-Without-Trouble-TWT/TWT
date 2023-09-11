import axios from 'axios';
import { authApi } from './auth';
import { Top10Props, ReviewProps, ScheduleProps } from './type';

//방문지 top10
export const getTop10Fn = async () => {
  const response = await authApi.get('/search/main'); //authAPI로 변경예정
  return response.data;
};

//스케쥴들
export const getSchedulesFn = async (page: number) => {
  const response = await authApi.get<ScheduleProps>(
    `/search/recent/pageNum=${page + 1}`
  );
  return response.data;
};

//선택페이지 리스트들
export const getPlaceFn = async (
  placeLocation: string,
  placeType: string,
  page: number
) => {
  const response = await authApi.get<Top10Props>(
    `/search/location?placeLocation=${placeLocation}&placeType=${placeType}&pageNum=${page}`
  );
  return response.data;
};

//마이페이지
export const getUserDataFn = async (category: string, page: number) => {
  const response = await authApi.get(
    `/search/member/${category}?pageNum=${page + 1}`
  );
  return response.data;
};

//리뷰 리스트들
export const getPlaceReviewsFn = async (page: number) => {
  const response = await authApi.get<ReviewProps>(
    `/review/place?placeId=&pageNum=${page}`
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

//post
export const postReviewFn = async (data, files) => {
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
  formData.append('files', files);

  const response = authApi.post('/review/place', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
//

//delete
export const deleteScheduleFn = async (scheduleId: Number) => {
  const response = await authApi.delete(
    `/schedule/cancel?scheduleId=${scheduleId}`
  );
  return response.data;
};

export const deleteDailyScheduleFn = async (
  dayScheduleId: number,
  index: number
) => {
  const response = await authApi.delete(`/daily/del`);
  return response.data;
};
