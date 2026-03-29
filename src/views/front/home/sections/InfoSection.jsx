import { Link } from 'react-router-dom';

const InfoSection = () => {
  const infoData = [
    {
      id: 1,
      title: '稀有寵物照護全指南',
      text: '想知道你家稀有寵物如何照護嗎?',
      link: '/articles',
    },
    {
      id: 2,
      title: '寵物背後的小故事',
      text: '每個寵物背後都有一個可愛的小故事?',
      link: '/articles',
    },
    {
      id: 3,
      title: '寵物界新鮮事',
      text: '掌握寵物界最新的潮流新鮮事?',
      link: '/articles',
    },
  ];
  return (
    <>
      <div className="infoSection container-md-fluid mb-5">
        <div className="d-flex justify-content-center section-title-outside pb-md-4">
          <h2 className="section-title pb-4" data-en-title="Information">
            稀寵資訊專區
          </h2>
        </div>
        {/* <!-- ---  稀寵資訊卡片區 --- --> */}
        <div className="infoContent py-3 px-1 mx-0 mx-md-auto px-md-0 row g-3 g-md-4 py-md-5">
          {infoData.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="infoContentCard p-md-5">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-text">{item.text}</p>
                <Link to={item.link} className="stretched-link">
                  查看文章
                </Link>
              </div>
            </div>
          ))}

          <Link
            className="moreInfoBtn btn mb-3 mt-4 mb-md-0 mt-md-5"
            to="/articles"
          >
            更多文章
          </Link>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
