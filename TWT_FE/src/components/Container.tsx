interface ContainerProps {
  image: string;
  profileImg: string;
  title: string;
  description: string;
}

function Container({ image, profileImg, title, description }: ContainerProps) {
  return (
    <div className="relative flex flex-col rounded-xl w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl dark:bg-gray-800 dark:text-white dark:!shadow-none">
      <div className="relative flex h-32 w-full rounded-xl bg-cover">
        <img
          src={image}
          className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
        />
        <div className="absolute -bottom-12 flex ml-5 h-[80px] w-[80px] rounded-full border-[4px] border-white dark:!border-gray-800">
          <img className="h-full w-full rounded-full" src={profileImg} alt="" />
        </div>
      </div>
      <div className="mt-16 flex ml-1">
        <span className="text-base text-gray dark:text-white">00님의 일정</span>
        <p className="ml-1 text-base text-gray dark:text-white">| 여행기간</p>
      </div>
      <div className="mt-5 mb-3">
        <a href="/id">
          <p className="hover:underline text-lg font-bold dark:text-white">
            {title}
          </p>
        </a>
        <p className="dark:text-lightgray">{description}</p>
      </div>
    </div>
  );
}

export default Container;
