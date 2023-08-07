function Footer() {
  return (
    <footer className="relative mt-8 pt-8 pb-6 bg-lightgray">
      <div className="flex flex-wrap items-center md:justify-between justify-center bg-lightgray">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm font-semibold py-1 flex flex-col">
            Copyright © {new Date().getFullYear()}
            <a
              href="https://www.creative-tim.com/product/notus-js"
              target="blank"
            >
              <strong className="text-blue">T</strong>ravel
              <strong className="text-blue">W</strong>ithout
              <strong className="text-blue">T</strong>rouble
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
