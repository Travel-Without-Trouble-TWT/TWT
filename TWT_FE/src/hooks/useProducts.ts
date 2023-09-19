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
  deleteScheduleFn,
  postScheduleFn,
  getExistedSchedule,
  addScheduleFn,
  addLikeFn,
  getNearPlaces,
} from '../api';

import { calculateCenter } from '../utils/calculate';

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
export const usePlaces = (
  type: string,
  location: string,
  pageParam: number
) => {
  const {
    data: places,
    isLoading: placeLoading,
    isError: placeError,
    refetch: placeRefetch,
  } = useQuery(['places'], () => getPlaceFn(type, location, pageParam), {
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  });
  const center = calculateCenter(places);
  return {
    places,
    placeLoading,
    placeError,
    placeRefetch,
    center,
  };
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
export const useUserDatas = (
  category: string,
  pageParam: number,
  placeLocation?: string
) => {
  const {
    data: userDatas,
    isLoading: userDataLoading,
    isError: userDataError,
    refetch: userDataRefetch,
  } = useQuery(
    ['userDatas'],
    () => getUserDataFn(category, pageParam, placeLocation),
    {
      refetchOnWindowFocus: true,
      enabled: !!placeLocation,
    }
  );
  return {
    userDatas,
    userDataLoading,
    userDataError,
    userDataRefetch,
  };
};

//리뷰 리스트들
export const useReviews = (placeId: number, pageParam: number) => {
  const {
    data: reviews,
    isLoading: reviewLoading,
    isError: reviewError,
    refetch: reviewRefetch,
  } = useQuery(['reviews'], () => getPlaceReviewsFn(placeId, pageParam), {
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  });
  return { reviews, reviewLoading, reviewError, reviewRefetch };
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

//주변 플레이스
export const useNearPlaces = (placeId: number) => {
  const {
    data: nearPlaces,
    isLoading: nearPlacesLoading,
    isError: nearPlacesError,
  } = useQuery(['nearPlaces', placeId], () => getNearPlaces(placeId), {
    enabled: true,
  });
  return { nearPlaces, nearPlacesLoading, nearPlacesError };
};

//해당 스케줄 정보
export const useSchedule = (scheduleId: number) => {
  const {
    data: schedule,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useQuery(['schedule', scheduleId], () => getScheduleFn(scheduleId), {
    refetchOnWindowFocus: true,
  });
  return { schedule, scheduleLoading, scheduleError };
};

//기존 일정들 정보 (모달창용)
export const useExistedSchedules = (placeLocation: string) => {
  const {
    data: existedSchedules,
    isLoading: existedScheduling,
    isError: existedScheduleError,
    refetch: existedScheduleRefetch,
  } = useQuery(
    ['existedSchedule', placeLocation],
    () => getExistedSchedule(placeLocation),
    {
      retry: 1,
      onError: (error) => console.log(error),
      select: (existedSchedules) => {
        if (existedSchedules && Array.isArray(existedSchedules)) {
          return existedSchedules.map((item) => ({
            ...item,
            days: item.days
              ? Array.from({ length: item.days }, (_, index) => index + 1)
              : [],
          }));
        }
        return existedSchedules;
      },
    }
  );
  return {
    existedSchedules,
    existedScheduling,
    existedScheduleError,
    existedScheduleRefetch,
  };
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

export const useDeleteSchedule = (scheduleId: number) => {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, isError } = useMutation(
    (data) => deleteScheduleFn(scheduleId),
    {
      onSuccess: (schedule) => queryClient.invalidateQueries(schedule),
    }
  );
};

//새로운 일정 추가
export const usePostSchedule = (data: any) => {
  const queryClient = useQueryClient();
  const {
    mutate: postSchedule,
    isLoading: schedulePosting,
    isSuccess: schedulePostingSuccess,
    isError: schedulePostingError,
  } = useMutation(() => postScheduleFn(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['schedule']);
    },
  });
  return {
    postSchedule,
    schedulePosting,
    schedulePostingSuccess,
    schedulePostingError,
  };
};

//기존 일정에 추가
export const useAddSchedule = (data: any) => {
  const queryClient = useQueryClient();
  const {
    mutate: addSchedule,
    isLoading: scheduleAdding,
    isSuccess: scheduleAddingSuccess,
    isError: scheduleAddingError,
  } = useMutation(() => addScheduleFn(data), {
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['schedule']);
    },
  });
  return {
    addSchedule,
    scheduleAdding,
    scheduleAddingSuccess,
    scheduleAddingError,
  };
};

export const useAddLike = (postId: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: addLike,
    isLoading: likeAdding,
    isSuccess: likeAddingSuccess,
    isError: likeAddingError,
  } = useMutation(() => addLikeFn(postId), {
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['placeInfos']);
    },
  });
  return { addLike, likeAdding, likeAddingSuccess, likeAddingError };
};
