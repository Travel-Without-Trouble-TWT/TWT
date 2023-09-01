import axios from 'axios';
import { Top10Props, ReviewProps } from './type';

export const getTop10Fn = async () => {
  const response = await axios.get<Top10Props>('/search/main'); //authAPI로 변경예정
  return response.data;
};

export const getReviewsFn = async (page: number) => {
  const response = await axios.get<ReviewProps>(
    `/search/recent/pageNum=${page + 1}`
  );
  return response.data;
};

export const getPlaceFn = async (
  placeLocation: string,
  placeType: string,
  page: number
) => {
  const response = await axios.get<Top10Props>(
    `/search/location?placeLocation=${placeLocation}&placeType=${placeType}&pageNum=${page}`
  );
  return response.data;
};

export const getUserDataFn = async (category: string, page: number) => {
  const response = await axios.get(
    `/search/member/${category}?pageNum=${page + 1}`
  );
  return response.data;
};
