function List() {
  return (
    <section className="dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 mt-8 tablet:mt-16 tablet:grid-cols-2">
          <div className="lg:flex">
            <img
              className="object-cover w-full h-56 rounded-lg lg:w-64"
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />

            <div className="flex flex-col justify-between py-4 lg:mx-6">
              <a
                href="/"
                className="text-xl font-semibold hover:underline dark:text-white"
              >
                Title
              </a>
              <div className="flex items-center">
                <span className="text-yellow-300">★</span>
                <p className="ml-1 text-sm font-semibold text-gray dark:text-white">
                  4.0
                </p>
                <span className="w-1 h-1 mx-0.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a
                  href="/"
                  className="text-sm font-medium text-gray hover:underline dark:text-white"
                >
                  0개의 리뷰
                </a>
              </div>
              <div className="flex items-center">
                <p className="text-red">♥︎</p>
                <p className="ml-1 text-sm font-semibold text-gray dark:text-white">
                  +99
                </p>
              </div>
              <span className="text-sm dark:text-gray-300">description</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default List;
