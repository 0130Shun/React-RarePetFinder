import SearchBar from "../../../../components/SearchBar";

const HeroSection = () => {
  return (
    <>
      <header className="container heroSection px-3 py-5 mb-4">
        <div className="row-md hero-img-sign">
          {/* <!-- <div className="w-57"> --> */}
          <div className="pb-5">
            <h1 className="heroTitle mx-3 mx-md-0">
              稀寵搜搜，
              <br className="d-md-none" />
              搜出你的稀有空間
            </h1>
            <p className="mx-3 mx-md-0 heroSlogan">診所、旅館、賣家 一鍵查找</p>
          </div>
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default HeroSection;
