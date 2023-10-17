import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  deleteDailyScheduleFn,
  changeScheduleFn,
  fixScheduleTimeFn,
  postShareFn,
} from '../api';

import { calculateCenter } from '../utils/calculate';
import { useState } from 'react';

//메인페이지 스케쥴들
export const useSchedules = (pageParam: number) => {
  const {
    data: schedules,
    isLoading: schedulesLoading,
    isError: schedulesError,
  } = useQuery(['schedules'], () => getSchedulesFn(pageParam));
  return {
    schedules,
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
    onSuccess: (data) => {},
    onError: (error) => {},
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
    onSuccess: (response) => {},
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

//리뷰쓰기
export const usePostReivews = (reviewPost: any, file: File | null) => {
  const queryClient = useQueryClient();
  const {
    mutate: postReviews,
    isLoading: reviewPosting,
    isSuccess: reviewPostingSuccess,
    isError: reviewPostingError,
  } = useMutation(() => postReviewFn(reviewPost, file), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
    onError: (error) => console.log('업로드 중 오류 발생. 다시 시도해주세요.'),
  });
  return {
    postReviews,
    reviewPosting,
    reviewPostingSuccess,
    reviewPostingError,
  };
};

//일정 삭제
export const useDeleteSchedule = (scheduleId: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteSchedule,
    isLoading: scheduleDeleting,
    isSuccess: scheduleDeletingSuccess,
    isError: scheduleDeletingError,
  } = useMutation(() => deleteScheduleFn(scheduleId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
    },
  });
  return {
    deleteSchedule,
    scheduleDeleting,
    scheduleDeletingSuccess,
    scheduleDeletingError,
  };
};
//일정 장소 삭제
export const useDeletePlace = (data: {
  dayScheduleId: number;
  index: number;
}) => {
  const queryClient = useQueryClient();
  const {
    mutate: deletePlace,
    isLoading: placeDeleting,
    isSuccess: placeDeleteSuccess,
    isError: placeDeleteError,
  } = useMutation(() => deleteDailyScheduleFn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
    },
    onError: (error) => console.log(error),
  });
  return { deletePlace, placeDeleting, placeDeleteSuccess, placeDeleteError };
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

//날짜 편집
export const useEditDate = (data: any) => {
  const queryClient = useQueryClient();
  const {
    mutate: editDate,
    isLoading: dateEditing,
    isSuccess: dateEditSuccess,
    isError: dateEditError,
  } = useMutation(() => changeScheduleFn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
    },
  });
  return { editDate, dateEditing, dateEditSuccess, dateEditError };
};

//시간편집
export const useEditTime = (data: any) => {
  const queryClient = useQueryClient();
  const {
    mutate: editTime,
    isLoading: timeEditing,
    isSuccess: timeEditSuccess,
    isError: timeEditError,
  } = useMutation(() => fixScheduleTimeFn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
    },
  });
  return { editTime, timeEditing, timeEditSuccess, timeEditError };
};

//일정공유
export const useShareSchedule = (data: any) => {
  const queryClient = useQueryClient();
  const {
    mutate: shareSchedule,
    isLoading: scheduleSharing,
    isSuccess: scheduleSharingSuccess,
    isError: scheduleSharingError,
  } = useMutation(() => postShareFn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['schedule']);
    },
  });
  return {
    shareSchedule,
    scheduleSharing,
    scheduleSharingSuccess,
    scheduleSharingError,
  };
};
