import { Top10Props } from '../api/type';

function ListItem({
  id,
  placeName,
  placeType,
  placeLocation,
  star,
  placeHeart,
  placeImageUrl,
  reviewNum,
}: Top10Props) {
  return (
    <div className="lg:flex">
      <img
        className="object-cover w-full h-56 rounded-lg lg:w-64"
        src={placeImageUrl}
        alt={placeName}
      />

      <div className="flex flex-col justify-between py-4 lg:mx-6">
        <a
          href={`/${id}`}
          className="text-xl font-semibold hover:underline dark:text-white"
        >
          {placeName}
        </a>
        <div className="flex items-center">
          <span className="text-yellow-300">★</span>
          <p className="ml-1 text-sm font-semibold text-gray dark:text-white">
            {star}
          </p>
          <span className="w-1 h-1 mx-0.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
          <a
            href={`/${id}`}
            className="text-sm font-medium text-gray hover:underline dark:text-white"
          >
            {reviewNum}개의 리뷰
          </a>
        </div>
        <div className="flex items-center">
          <p className="text-red">♥︎</p>
          <p className="ml-1 text-sm font-semibold text-gray dark:text-white">
            {placeHeart}
          </p>
        </div>
        <span className="text-sm dark:text-gray-300">
          {placeType} | {placeLocation}
        </span>
      </div>
    </div>
  );
}

export default ListItem;
