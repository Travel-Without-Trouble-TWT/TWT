function Loader({ size }: any) {
  return (
    <div className="flex w-full min-h-full justify-center items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-live="polite"
        aria-busy="true"
      >
        <path
          d="M7 10H3V14H7V10Z"
          className="animate animate-bounce fill-skyblue "
        />
        <path
          d="M14 10H10V14H14V10Z"
          className="animate animate-bounce fill-skyblue [animation-delay:.2s]"
        />
        <path
          d="M21 10H17V14H21V10Z"
          className="animate animate-bounce fill-skyblue [animation-delay:.4s]"
        />
      </svg>
    </div>
  );
}

export default Loader;
