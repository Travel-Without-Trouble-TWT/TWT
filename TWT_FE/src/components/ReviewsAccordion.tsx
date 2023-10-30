import { PageProps } from '../api/type';
import Stars from './Stars';

function ReviewsAccordion({ data }: { data: PageProps }) {
  return (
    <section className="w-full divide-y rounded divide-slate-200 px-10 dark:divide-slate-500">
      {data &&
        data.totalPages > 0 &&
        data.content.map((item: any) => (
          <>
            <details className="p-4 group">
              <summary className="relative cursor-pointer list-none pr-8 font-semibold xs:text-sm dark:text-slate-500 text-slate-600 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900 dark:group-hover:text-slate-300 [&::-webkit-details-marker]:hidden">
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
              <div className="flex flex-col gap-2 w-full">
                <Stars size={'w-4 h-4'} rating={item.star} key={item.id} />
                <div className="flex w-full gap-2 overflow-auto">
                  {item.reviewImageList &&
                    item.reviewImageList.length > 0 &&
                    item.reviewImageList.map((img: string, idx: number) => (
                      <img
                        className="w-[90px] h-[60px]"
                        src={img}
                        alt={`img-${idx}`}
                      />
                    ))}
                </div>
              </div>
              <p className="mt-2 text-slate-500 text-sm dark:text-slate-300">
                {item.reviewComment}
              </p>
            </details>
          </>
        ))}
    </section>
  );
}

export default ReviewsAccordion;
