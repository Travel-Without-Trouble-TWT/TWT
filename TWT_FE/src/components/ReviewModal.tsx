import { useState, useRef } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineClose } from 'react-icons/ai';
import Score from './Score';

function ReviewModal({
  setShowModal,
}: {
  setShowModal: (showModal: string | '') => void;
}) {
  const [img, setImg] = useState<string[]>([]); //file data
  const [reviewText, setReviewText] = useState('');
  const [score, setScore] = useState<number | null>(null); //별점

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgLists: FileList | null = e.target.files;
    if (!imgLists) return;

    let imgUrlLists = [...img];

    for (let i = 0; i < imgLists.length; i++) {
      const currentImgUrl = URL.createObjectURL(imgLists[i]);
      imgUrlLists.push(currentImgUrl);
    }

    if (imgUrlLists.length > 9) {
      imgUrlLists = imgUrlLists.slice(0, 9); //최대 9장만 허용
    }
    setImg(imgUrlLists);
  };

  const handleDeleteImg = (id: number) => {
    setImg(img.filter((_, index) => index !== id));
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen bg-lightgray/20 backdrop-blur-sm"
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
            <h3 className="flex-1 text-xl font-bold">장소명</h3>
            <button aria-label="close" onClick={() => setShowModal('')}>
              <AiOutlineClose />
            </button>
          </header>
          <Score setScore={setScore} />
          <div className="flex flex-wrap overflow-auto justify-evenly">
            <input
              className="hidden"
              type="file"
              id="input-file"
              accept="image/*"
              multiple
              onChange={handleUploadImgs}
              ref={fileRef}
            />
            <div
              className="h-24 flex justify-center items-center cursor-pointer bg-lightgray text-gray text-5xl p-10"
              onClick={() => fileRef.current?.click()}
            >
              +
            </div>

            {img.map((image, id) => (
              <div key={id} className="w-1/5 p-1">
                <div className="relative">
                  <img
                    className="w-full h-24 object-cover"
                    src={image}
                    alt={`${image}-${id}`}
                  />
                  <TiDelete
                    className="text-gray w-5 h-5 absolute top-[-5px] right-[-5px] cursor-pointer z-10"
                    onClick={() => handleDeleteImg(id)}
                  />
                </div>
              </div>
            ))}
          </div>
          {!img.length && (
            <span className="flex self-center text-sm mt-[-20px] text-gray">
              최대 9장 업로드 가능
            </span>
          )}
          <div className="relative">
            <textarea
              className="peer relative w-full rounded border border-lightgray px-4 py-2 text-sm outline-none transition-all autofill:bg-white invalid:border-red/90 invalid:text-red/90 focus:outline-none invalid:focus:border-red/90"
              rows={3}
              placeholder="리뷰를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              disabled={!img.length || !reviewText || !score}
              className={`inline-flex items-center justify-center flex-1 h-10 gap-2 px-5 text-sm font-semibold tracking-wide duration-300 rounded whitespace-nowrap ${
                !img.length || !reviewText || !score
                  ? 'bg-skyblue/60'
                  : 'bg-skyblue'
              }`}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewModal;
