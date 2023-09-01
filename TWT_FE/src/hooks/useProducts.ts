import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getReviewsFn, getTop10Fn, getPlaceFn } from '../api';

export const useReviews = () => {
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
  return { reviews, fetchNextPage, hasNextPage, reviewLoading, reviewError };
};

export const usePlaces = (placeType: string, placeLocation: string) => {
  const {
    data: places,
    fetchNextPage,
    hasNextPage,
    isLoading: placeLoading,
    isError: placeError,
  } = useInfiniteQuery(
    ['places'],
    ({ pageParam = 0 }) => getPlaceFn(placeType, placeLocation, pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.number + 1;
      },
      select: (data) => {
        const pages = data.pages.flatMap((page) => page.content);
        return {
          places: pages,
          hasNextPage: !data.last,
        };
      },
    }
  );
  return { places, fetchNextPage, hasNextPage, placeLoading, placeError };
};

export const useTop10 = () => {
  const {
    data: top10,
    isLoading: top10Loading,
    isError: top10Error,
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
  return { top10, top10Loading, top10Error };
};
