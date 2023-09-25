import { PageProps } from '../api/type';

function ReviewsAccordion({ data }: { data: PageProps }) {
  return (
    <section className="w-full divide-y rounded divide-slate-200">
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <>
            <details className="p-4 group" open>
              <summary className="relative cursor-pointer list-none pr-8 font-semibold text-slate-600 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                {item.place.placeName}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-ac01 desc-ac01"
                >
                  <title id="title-ac01">Open icon</title>
                  <desc id="desc-ac01">
                    icon that represents the state of the summary
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <div className="flex mt-4 gap-2">
                {item.reviewImageList &&
                  item.reviewImageList.length > 0 &&
                  item.reviewImageList.map((img) => (
                    <img className="w-[90px] h-[60px]" src={img} />
                  ))}
              </div>
              <p className="mt-2 text-slate-500 text-sm">
                {item.reviewComment}
              </p>
            </details>
          </>
        ))}
    </section>
  );
}

export default ReviewsAccordion;
