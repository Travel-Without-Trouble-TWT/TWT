import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getReviewsFn, getTop10Fn } from '../api';

const useReviews = () => {
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useInfiniteQuery(
    ['reviews'],
    ({ pageParam = 0 }) => getReviewsFn(pageParam),
    {
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.page !== allPosts[0].totalPage
          ? lastPage.page + 1
          : undefined;
      },
      select: (data) => ({
        pages: data?.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    }
  );
};

const useTop10 = () => {
  const {
    data: top10,
    isLoading: top10Loading,
    isError,
  } = useQuery(['top10'], getTop10Fn, {
    enabled: false,
    retry: 1,
    onSuccess: (data) => {
      // id,placeName,placeType,placeLocation,star,placeHeart,placeImageUrl,
    },
    onError: (error) => {
      //alert
    },
  });
};
export default { useReviews, useTop10 };
