import { useRef } from 'react';
import ImageCarousel from './ImageCarousel';

import { AiOutlineClose } from 'react-icons/ai';

function ZoomModal({
  setShowModal,
  selectedImages,
  selectedImageIndex,
}: {
  setShowModal: () => void;
  selectedImages: string[];
  selectedImageIndex: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-black/20 backdrop-blur-sm"
      aria-labelledby="header-5a content-5a"
      aria-modal="true"
      tabIndex={-1}
      role="dialog"
    >
      <div
        ref={wrapperRef}
        className="flex max-h-[90vh] w-4/5 max-w-2xl flex-col gap-6 overflow-hidden rounded-xl bg-white p-6 shadow-xl"
        id="modal"
        role="document"
      >
        <header className="flex gap-4">
          <h3 className="flex-1 text-xl font-bold">이미지 보기</h3>
          <button aria-label="close" onClick={() => setShowModal()}>
            <AiOutlineClose />
          </button>
        </header>
        <div className="flex justify-center items-center">
          <ImageCarousel
            images={selectedImages}
            selectedIndex={selectedImageIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default ZoomModal;
