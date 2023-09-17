import { useState } from 'react';
import Stars from './Stars';
import ZoomModal from './ZoomModal';

function ReviewList(data) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages([...images]);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const reviews = [
    {
      createAt: '2023-08-01',
      id: 0,
      nickName: '닉네임',
      reviewComment: '여기 내가 가본 곳 중에 원탑임.',
      reviewImageList: [
        'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfNzQg/MDAxNjYwNjE4Nzg0MzI0.nnU6bkwd9pyfnfZ_f1n0guaFPljXrXGPDK1ndDDT7b4g.eyufddGemHi5Ht8M5cQpZAweaaKd7ih_Kp-U-KHjG-8g.JPEG.hkwoozi/20220816%EF%BC%BF115912.jpg?type=w800',
        'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfMjg1/MDAxNjYwNjE4Nzg0ODY3.XW7zJ6GMN5Jd8Ja_KVq2Bw-fKI3rqnGVQHjxq5OSIkIg.xTD0rTk1EdxS7No0MEykgPUjJ9HgOKpW4pQjjTivfZEg.JPEG.hkwoozi/20220816%EF%BC%BF115913.jpg?type=w800',
      ],
      star: 4.5,
    },
    {
      createAt: '2023-08-20',
      id: 1,
      nickName: '닉네임',
      reviewComment: '그냥 그럼',
      reviewImageList: [
        'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfNzQg/MDAxNjYwNjE4Nzg0MzI0.nnU6bkwd9pyfnfZ_f1n0guaFPljXrXGPDK1ndDDT7b4g.eyufddGemHi5Ht8M5cQpZAweaaKd7ih_Kp-U-KHjG-8g.JPEG.hkwoozi/20220816%EF%BC%BF115912.jpg?type=w800',
        'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfMjg1/MDAxNjYwNjE4Nzg0ODY3.XW7zJ6GMN5Jd8Ja_KVq2Bw-fKI3rqnGVQHjxq5OSIkIg.xTD0rTk1EdxS7No0MEykgPUjJ9HgOKpW4pQjjTivfZEg.JPEG.hkwoozi/20220816%EF%BC%BF115913.jpg?type=w800',
      ],
      star: 2.5,
    },
    {
      createAt: '2023-08-21',
      id: 2,
      nickName: '닉네임',
      reviewComment: '여기 내가 가본 곳 중에 원탑임.',
      reviewImageList: [
        'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfNzQg/MDAxNjYwNjE4Nzg0MzI0.nnU6bkwd9pyfnfZ_f1n0guaFPljXrXGPDK1ndDDT7b4g.eyufddGemHi5Ht8M5cQpZAweaaKd7ih_Kp-U-KHjG-8g.JPEG.hkwoozi/20220816%EF%BC%BF115912.jpg?type=w800',
        'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTZfMjg1/MDAxNjYwNjE4Nzg0ODY3.XW7zJ6GMN5Jd8Ja_KVq2Bw-fKI3rqnGVQHjxq5OSIkIg.xTD0rTk1EdxS7No0MEykgPUjJ9HgOKpW4pQjjTivfZEg.JPEG.hkwoozi/20220816%EF%BC%BF115913.jpg?type=w800',
      ],
      star: 5,
    },
  ];
  return (
    <>
      {reviews &&
        reviews.map((review, index) => (
          <div className="flex w-full flex-col divide-y border-b border-slate-300 py-2">
            <div className="flex flex-col gap-2 py-4">
              <h4 className="flex w-full flex-1 gap-4 text-base font-medium text-slate-700">
                <div className="w-0 flex-1 flex gap-2 items-center">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2Fa8%2F75%2F12%2Fa87512767cddbb9a609dc7c7171dde91.jpg&type=sc960_832"
                  />
                  <div className="flex flex-col">
                    <span className="truncate text-sm font-semibold text-slate-700 dark:text-white">
                      {review.nickName}
                    </span>
                    <Stars size={'w-4 h-4'} rating={review.star} />
                    <span className="text-xs text-gray">{review.createAt}</span>
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
        ))}

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
