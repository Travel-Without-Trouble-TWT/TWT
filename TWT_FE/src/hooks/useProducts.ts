import { useInfiniteQuery } from '@tanstack/react-query';

import { getReviewsFn } from '../api';

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

export default useReviews;
