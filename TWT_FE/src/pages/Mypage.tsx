import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TfiWrite } from 'react-icons/tfi';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
//hooks
import { useUserDatas } from '../hooks/useProducts';
import { useEditProfileImg } from '../hooks/useAuth';
import { useUserContext } from '../context';
//components
import SouthKoreaMap from '../components/SouthKoreaMap';
import ScheduleList from '../components/ScheduleList';
import ListItem from '../components/ListItem';
import ReviewsAccordion from '../components/ReviewsAccordion';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

function Mypage() {
  const navigate = useNavigate();
  const { isLogin, user } = useUserContext();
  const { category, page } = useParams();
  const [isListOpen, setIsListOpen] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page, 10) : 1
  );
  const [editImg, setEditImg] = useState<File | null>(null);
  const { userDatas, userDataLoading, userDataError, userDataRefetch } =
    useUserDatas(category, currentPage - 1, isListOpen);
  const fileRef = useRef<HTMLInputElement>(null);
  const { editProfileImg } = useEditProfileImg(editImg);

  const handleUploadProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditImg(e.target.files[0]);
    }
    editProfileImg(editImg);
  };
  const handlePageChange = (pageNumber: number) => {
    navigate(`/mypage/${category}/${pageNumber}`);
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    if (isListOpen !== null) {
      userDataRefetch();
    }
  }, [isListOpen]);

  useEffect(() => {
    userDataRefetch();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    userDataRefetch();
  }, [category]);
  return (
    <>
      <section className="bg-lightgray dark:bg-slate-950 min-w-full min-h-screen flex justify-center flex-col py-6 xs:px-1">
        <div className="container mx-auto bg-white rounded-lg shadow-xl pb-8 mb-2 dark:bg-slate-900">
          <div className="w-full h-[150px] bg-lightgray dark:bg-slate-800 rounded-lg"></div>
          <div className="flex flex-col items-center -mt-20">
            <div className="relative">
              <img
                alt="profile image"
                src={
                  user?.profileUrl
                    ? user?.profileUrl
                    : 'https://mblogthumb-phinf.pstatic.net/20150427_73/ninevincent_1430122793329pvryW_JPEG/kakao_7.jpg?type=w420'
                }
                className="w-[120px] h-[120px] border-4 border-white rounded-full dark:border-slate-900"
              />
              <input
                ref={fileRef}
                className="hidden"
                type="file"
                id="input-file"
                accept="image/*, multipart/form-data"
                onChange={handleUploadProfileImg}
              />
              <BiSolidPencil
                onClick={() => fileRef.current?.click()}
                role="button"
                className="absolute top-24 right-2 w-[30px] h-[30px] p-1 rounded-full bg-white text-skyblue"
              />
            </div>

            <p className="text-2xl mt-2 dark:text-white">{user?.nickName}</p>
            <p className="mt-2 text-gray mb-5">
              <a href="/profile">프로필 수정</a>
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <button
                className={`flex items-center bg-skyblue/80 hover:bg-skyblue text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100 ${
                  category === 'schedule' && 'bg-skyblue text-black'
                }`}
              >
                <Link
                  to={`/mypage/schedule/${currentPage}`}
                  className="flex items-center gap-2"
                >
                  <AiTwotoneCalendar />
                  일정
                </Link>
              </button>
              <button
                className={`flex items-center bg-skyblue/80 hover:bg-skyblue text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100 ${
                  category === 'review' && 'bg-skyblue text-black'
                }`}
              >
                <Link
                  to={`/mypage/review/${currentPage}`}
                  className="flex items-center gap-2"
                >
                  <TfiWrite /> 리뷰
                </Link>
              </button>
              <button
                className={`flex items-center bg-skyblue/80 hover:bg-skyblue text-white hover:text-black px-4 py-2 rounded-xl text-sm space-x-2 transition duration-100 ${
                  category === 'heart' && 'bg-skyblue text-black'
                }`}
              >
                <Link to={`/mypage/heart/${currentPage}`}>♡ 좋아요</Link>
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto bg-white rounded-lg shadow-xl pb-8 dark:bg-slate-800">
          <div className="flex justify-center p-10 xs:p-4">
            {category === 'schedule' && (
              <div className="w-full h-full flex">
                {userDataLoading ? (
                  <Loader size={'10'} />
                ) : (
                  <>
                    <SouthKoreaMap
                      isListOpen={isListOpen}
                      setIsListOpen={setIsListOpen}
                    />
                    {isListOpen && !userDataLoading && (
                      <ScheduleList
                        userDatas={userDatas}
                        isListOpen={isListOpen}
                      />
                    )}
                  </>
                )}
              </div>
            )}
            {category === 'review' && (
              <ReviewsAccordion
                data={userDatas}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
            {category === 'heart' && (
              <div className="flex flex-col">
                {userDataLoading ? (
                  <Loader size={'10'} />
                ) : (
                  <>
                    {userDatas &&
                      userDatas.content &&
                      userDatas.totalPages > 0 && (
                        <div className="grid grid-cols-2 gap-8 mt-8 xs:grid-cols-1">
                          <ListItem data={userDatas.content} />
                        </div>
                      )}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={userDatas ? userDatas.totalPages : 0}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Mypage;
