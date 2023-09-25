function ListItem({ data }: { data: any }) {
  return (
    <>
      {data.map((item: any) => (
        <div className="flex flex-col dark:bg-slate-900">
          <img
            className="object-cover w-full h-56 rounded-lg lg:w-64"
            src={item.placeImageUrl}
            alt={item.placeName}
          />

          <div className="flex flex-col justify-between py-4 lg:mx-3">
            <a
              href={`/detail/${item.id}`}
              className="text-xl font-semibold hover:underline dark:text-white"
            >
              {item.placeName}
            </a>
            <div className="flex items-center">
              <span className="text-yellow-300 text-yellow">★</span>
              <p className="ml-1 text-sm font-semibold text-gray dark:text-white">
                {item.star}
              </p>
              <span className="w-1 h-1 mx-0.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a
                href={`/detail/${item.id}`}
                className="text-sm font-medium text-gray hover:underline dark:text-gray-300"
              >
                {item.reviewNum === 0 ? '0' : item.reviewNum}개의 리뷰
              </a>
            </div>
            <div className="flex items-center">
              <p className="text-red">♥︎</p>
              <p className="ml-1 text-sm font-semibold text-slate-500 dark:text-white">
                {item.placeHeart}
              </p>
            </div>
            <span className="text-sm text-slate-500 dark:text-gray-300">
              {item.placeType} | {item.placeLocation}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListItem;
