import { ReviewProps } from '../api/type';

interface ReviewCardProps {
  data: ReviewProps;
}

function ReviewCard({ data }: ReviewCardProps) {
  return (
    <div className="relative flex flex-col rounded-xl w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl dark:bg-gray-800 dark:text-white dark:!shadow-none">
      <div className="relative flex h-32 w-full rounded-xl bg-cover">
        <img
          src={data.scheduleImageUrl[0]}
          alt="스케쥴 대표 이미지"
          className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
        />
        <div className="absolute -bottom-12 flex ml-5 h-[80px] w-[80px] rounded-full border-[4px] border-white dark:!border-gray-800">
          <img
            className="h-full w-full rounded-full"
            src={data.profileUrl}
            alt={data.scheduleName}
          />
        </div>
      </div>
      <div className="mt-16 flex ml-1">
        <span className="text-base text-gray dark:text-white">
          {data.nickName}님의 일정
        </span>
        <p className="ml-1 text-base text-gray dark:text-white">
          | {data.startAt} ~ {data.endAt}
        </p>
      </div>
      <div className="mt-5 mb-3">
        <a href="/id">
          <p className="hover:underline text-lg font-bold dark:text-white">
            {data.scheduleName}
          </p>
        </a>
      </div>
    </div>
  );
}

export default ReviewCard;
