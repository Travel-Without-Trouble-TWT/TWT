import axios from 'axios';
import { Top10Props, ReviewProps } from './type';

export const getTop10Fn = async () => {
  const response = await axios.get<Top10Props>('/search/main'); //authAPI로 변경예정
  return response.data;
};

export const getReviewsFn = async (page: number) => {
  const response = await axios.get<ReviewProps>(
    `/search/recent/page=${page + 1}`
  );
  return response.data;
};
