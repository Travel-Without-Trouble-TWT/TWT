import { useEffect, useState } from 'react';
import Stars from './Stars';
import Pagination from './Pagination';
import ZoomModal from './ZoomModal';

import { useReviews } from '../hooks/useProducts';
import Loader from './Loader';

function ReviewList({ placeId }: { placeId: number }) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { reviews, reviewLoading, reviewError, reviewRefetch } = useReviews(
    placeId,
    currentPage - 1
  );

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages([...images]);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    reviewRefetch();
  }, [currentPage]);

  return (
    <>
      {!reviews ||
        (reviews.content.length === 0 && (
          <span className="font-semibold text-gray p-10">
            장소에 대한 리뷰가 아직 없습니다.
          </span>
        ))}
      {!reviews || reviewLoading ? (
        <Loader size={'20px'} />
      ) : (
        reviews.content.map((review) => (
          <div
            key={review.id}
            className="flex w-full flex-col divide-y border-b border-slate-300 py-2"
          >
            <div className="flex flex-col gap-2 py-4">
              <h4 className="flex w-full flex-1 gap-4 text-base font-medium text-slate-700">
                <div className="w-0 flex-1 flex gap-2 items-center">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      review.memberProfileUrl
                        ? review.memberProfileUrl
                        : 'https://mblogthumb-phinf.pstatic.net/20150427_73/ninevincent_1430122793329pvryW_JPEG/kakao_7.jpg?type=w420'
                    }
                  />
                  <div className="flex flex-col">
                    <span className="truncate text-sm font-semibold text-slate-700 dark:text-white">
                      {review.nickName}
                    </span>
                    <Stars
                      size={'w-4 h-4'}
                      rating={review.star}
                      key={review.id}
                    />
                    <span className="text-xs text-gray">
                      {review.createAt.split(':')[0]}:
                      {review.createAt.split(':')[1]}
                    </span>
                  </div>
                </div>
              </h4>
              <div className="flex w-full h-[94px] gap-3 relative">
                {review.reviewImageList.map((imgUrl, imgIdx) => (
                  <img
                    key={imgIdx}
                    alt={`Image ${imgIdx}`}
                    onClick={() =>
                      handleImageClick(review.reviewImageList, imgIdx)
                    }
                    className="w-24 h-full hover:cursor-pointer"
                    src={imgUrl}
                  />
                ))}
              </div>
              <p className="text-sm leading-6 text-slate-500">
                {review.reviewComment}
              </p>
            </div>
          </div>
        ))
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={reviews ? reviews.totalPages : 0}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <ZoomModal
          setShowModal={() => setIsModalOpen(false)}
          selectedImages={selectedImages}
          selectedImageIndex={selectedImageIndex}
        />
      )}
    </>
  );
}

export default ReviewList;
