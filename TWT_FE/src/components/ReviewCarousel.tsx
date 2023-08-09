import Glide from '@glidejs/glide';
import { useEffect } from 'react';
import Stars from './Stars';

function ReviewCarousel() {
  useEffect(() => {
    const slider = new Glide('.glide-08', {
      type: 'slider',
      focusAt: 0,
      animationDuration: 700,
      autoplay: 3000,
      rewind: true,
      perView: 3,
      hoverpause: true,
      gap: 20,
      breakpoints: {
        1024: {
          perView: 3,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);
  return (
    <>
      <div className="glide-08 relative w-full">
        <div data-glide-el="track" className="w-full">
          <ul className="whitespace-no-wrap flex-no-wrap touch-action-pan-Y] will-change-transfrom relative flex w-full overflow-hidden p-0 pb-12">
            <li>
              <div className="h-full w-full">
                <div className="h-full overflow-hidden rounded bg-white shadow-lg">
                  <div className="relative p-6">
                    <figure className="relative">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>료이키텐카이 무료쿠슈</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm">
                        <Stars />
                        <div className="flex items-center gap-4 pt-4 text-sm text-skyblue">
                          <img
                            className="max-w-full shrink-0 rounded-full w-[50px] h-[50px]"
                            alt="유저 프로필사진"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwzkQRHdLtAWDi14fK9g1AuN-YVW9OiqzqA&usqp=CAU"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray">유저 닉네임</span>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="h-full w-full">
                <div className="h-full overflow-hidden rounded bg-white shadow-2xl">
                  <div className="relative p-6">
                    <figure className="relative z-10">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>료이키텐카이 무료쿠슈</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm">
                        <Stars />
                        <div className="flex items-center gap-4 pt-4 text-sm text-skyblue">
                          <img
                            className="max-w-full shrink-0 rounded-full w-[50px] h-[50px]"
                            alt="유저 프로필사진"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwzkQRHdLtAWDi14fK9g1AuN-YVW9OiqzqA&usqp=CAU"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray">유저 닉네임</span>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="h-full w-full">
                <div className="h-full overflow-hidden rounded bg-white shadow-2xl">
                  <div className="relative p-6">
                    <figure className="relative z-10">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>료이키텐카이 무료쿠슈</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm">
                        <Stars />
                        <div className="flex items-center gap-4 pt-4 text-sm text-skyblue">
                          <img
                            className="max-w-full shrink-0 rounded-full w-[50px] h-[50px]"
                            alt="유저 프로필사진"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwzkQRHdLtAWDi14fK9g1AuN-YVW9OiqzqA&usqp=CAU"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray">유저 닉네임</span>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="h-full w-full">
                <div className="h-full overflow-hidden rounded bg-white shadow-2xl">
                  <div className="relative p-6">
                    <figure className="relative z-10">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>료이키텐카이 무료쿠슈</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm">
                        <Stars />
                        <div className="flex items-center gap-4 pt-4 text-sm text-skyblue">
                          <img
                            className="max-w-full shrink-0 rounded-full w-[50px] h-[50px]"
                            alt="유저 프로필사진"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwzkQRHdLtAWDi14fK9g1AuN-YVW9OiqzqA&usqp=CAU"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray">유저 닉네임</span>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="h-full w-full">
                <div className="h-full overflow-hidden rounded bg-white shadow-2xl">
                  <div className="relative p-6">
                    <figure className="relative z-10">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>료이키텐카이 무료쿠슈</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm">
                        <Stars />
                        <div className="flex items-center gap-4 pt-4 text-sm text-skyblue">
                          <img
                            className="max-w-full shrink-0 rounded-full w-[50px] h-[50px]"
                            alt="유저 프로필사진"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwzkQRHdLtAWDi14fK9g1AuN-YVW9OiqzqA&usqp=CAU"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray">유저 닉네임</span>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="h-full w-full">
                <div className="h-full overflow-hidden rounded bg-white shadow-2xl">
                  <div className="relative p-6">
                    <figure className="relative z-10">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>료이키텐카이 무료쿠슈</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm">
                        <Stars />
                        <div className="flex items-center gap-4 pt-4 text-sm text-skyblue">
                          <img
                            className="max-w-full shrink-0 rounded-full w-[50px] h-[50px]"
                            alt="유저 프로필사진"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwzkQRHdLtAWDi14fK9g1AuN-YVW9OiqzqA&usqp=CAU"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray">유저 닉네임</span>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ReviewCarousel;
