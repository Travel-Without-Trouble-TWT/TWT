import { PageProps } from '../api/type';

interface ReviewCardProps {
  data: PageProps;
}

function ReviewCard({ data }: ReviewCardProps) {
  return (
    <div className="flex gap-2">
      {data &&
        data.content.length > 0 &&
        data?.content.map((item) => (
          <div
            className="relative flex flex-col rounded-xl w-[400px] mx-auto p-4 bg-white bg-clip-border shadow dark:bg-gray-800 dark:text-white dark:!shadow-none"
            key={item.id}
          >
            <div className="relative flex h-32 w-full rounded-xl bg-cover">
              <img
                src={item.scheduleImageUrl}
                alt="스케쥴 대표 이미지"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
              />
              <div className="absolute -bottom-12 flex ml-5 h-[80px] w-[80px] rounded-full border-[4px] border-white dark:!border-gray-800">
                <img
                  className="h-full w-full rounded-full"
                  src={
                    item.member.profileUrl
                      ? item.member.profileUrl
                      : 'https://mblogthumb-phinf.pstatic.net/20150427_73/ninevincent_1430122793329pvryW_JPEG/kakao_7.jpg?type=w420'
                  }
                  alt={item.member.nickName}
                />
              </div>
            </div>
            <div className="mt-14 ml-2">
              <span className="text-sm text-gray dark:text-white">
                {item.member.nickName}님의 일정 | {item.startAt} ~ {item.endAt}
              </span>
              <a href={`/schedule/${item.id}`}>
                <p className="hover:underline text-lg font-bold dark:text-white">
                  {item.scheduleName}
                </p>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ReviewCard;
