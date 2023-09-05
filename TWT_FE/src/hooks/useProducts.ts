import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getSchedulesFn,
  getTop10Fn,
  getPlaceFn,
  getUserDataFn,
  postReviewFn,
  getPlaceReviewsFn,
  getPlaceInfoFn,
  getScheduleFn,
} from '../api';

//메인페이지 스케쥴들
export const useSchedules = () => {
  const {
    data: schedules,
    fetchNextPage,
    hasNextPage,
    isLoading: schedulesLoading,
    isError: schedulesError,
  } = useInfiniteQuery(
    ['schedules'],
    ({ pageParam = 0 }) => getSchedulesFn(pageParam),
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
  return {
    schedules,
    fetchNextPage,
    hasNextPage,
    schedulesLoading,
    schedulesError,
  };
};

//여행지 선택 후, 장소 리스트
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

//방문지 top10
export const useTop10 = () => {
  const {
    data: top10,
    isLoading: top10Loading,
    isError: top10Error,
  } = useQuery(['top10'], getTop10Fn, {
    enabled: true,
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

//마이페이지
export const useUserDatas = (category: string) => {
  const {
    data: userDatas,
    fetchNextPage,
    hasNextPage,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useInfiniteQuery(
    ['userDatas'],
    ({ pageParam = 0 }) => getUserDataFn(category, pageParam),
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
  return {
    userDatas,
    fetchNextPage,
    hasNextPage,
    userDataLoading,
    userDataError,
  };
};

//리뷰 리스트들
export const useReviews = () => {
  const {
    data: reviews,
    fetchNextPage,
    hasNextPage,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useInfiniteQuery(
    ['reviews'],
    ({ pageParam = 0 }) => getPlaceReviewsFn(pageParam),
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
  return { reviews, fetchNextPage, hasNextPage, reviewLoading, reviewError };
};

//해당 장소 정보
export const usePlaceInfo = (placeId: number) => {
  const {
    data: placeInfos,
    isLoading: placeInfoLoading,
    isError: placeInfoError,
  } = useQuery(['placeInfos', placeId], () => getPlaceInfoFn(placeId), {
    enabled: true,
    retry: 1,
    onSuccess: (data) => {
      // id,placeName,placeType,placeLocation,star,placeHeart,placeImageUrl,
    },
    onError: (error) => {
      //alert
    },
  });
  return { placeInfos, placeInfoLoading, placeInfoError };
};

//해당 스케줄 정보
export const useSchedule = (scheduleId: number) => {
  const {
    data: schedule,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery(['schedule', scheduleId], () => getScheduleFn(scheduleId), {
    enabled: true,
    retry: 1,
    onSuccess: {},
    onErro: (error) => {},
  });
  return { schedule, scheduleLoading, scheduleError };
};

//useMutation
export const usePostReivews = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: reviewPosting,
    isSuccess,
    isError,
  } = useMutation((data) => postReviewFn(reviewPost, file), {
    onSuccess: () => queryClient.invalidateQueries(reviews),
  });
};
