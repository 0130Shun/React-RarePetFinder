//防詐宣導區section
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
const scamData = [
  {
    id: 1,
    title: '【每日揭詐】01/12 愛心被利用！「假送養寵物真詐騙」慣用招數曝光',
    text: '防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元。其中，利用民眾愛心的「假送養真詐騙」案件近期有顯著增加的趨勢。詐騙集團常在社群平台發布品種貓狗的免費送養文，以可愛溫馨的照片吸引目光。當民眾主動聯繫後，便會以「需代墊疫苗費」、「海外空運託運費」或「結紮保證金」等名目要求先匯款。一旦被害人匯出款項，對方就會立刻人間蒸發。警方呼籲，網路認養務必提高警覺，切勿輕易匯款給陌生帳戶。',
    link: '/articles',
  },
  {
    id: 2,
    title: '養寵物可領3000元補助？農業部公布「不會被騙」的查詢補助方式',
    text: '近日網路上流傳「養寵物也能領補助！2025寵物津貼開放申請」的消息，引發不少飼主關注。對此，農業部發布新聞稿澄清，近期有詐騙集團冒用政府機關名義，聲稱提供「寵物津貼」或「3000元現金補助」，實際上是要騙取民眾的個人資料與銀行帳戶資訊。農業部強調，目前並未推行此類普發性的寵物津貼方案，民眾若收到相關簡訊或LINE訊息，切勿點擊不明連結或填寫個人資料。如有任何疑問，請直接至農業部官方網站查詢，或撥打165反詐騙專線查證。',
    link: '/articles',
  },
  {
    id: 3,
    title: '網購寵物患病率高？慎防寵物釣魚詐騙！',
    text: '愈來愈多家庭飼養寵物，並視牠們為家中一份子，寵愛程度與子女無異。近年不少社交媒體平台出現疑似出售聲稱自家繁殖貓狗的貼文，並經常以貓狗的相片或影片吸引買家。然而，這些貓狗的來源成疑，甚至可能涉及非法販賣或「寵物釣魚詐騙」。詐騙者通常會要求買家先支付高額訂金，收款後便封鎖買家；或是交出患有嚴重傳染病的幼犬幼貓，讓飼主不僅蒙受金錢損失，還要承受寵物離世的傷痛。建議民眾應透過合法持牌的寵物店或正規動保機構尋找毛小孩。',
    link: '/articles',
  },
  {
    id: 4,
    title: 'LINE傳「幫忙投票」小心有詐 南市 149人遭騙',
    text: '詐騙集團利用民眾已被盜用的親友LINE帳號，以「支持女兒作品」、「幫寵物攝影比賽投票」為由，傳送假連結誘導民眾點擊。當被害人登入假頁面並輸入帳號、密碼及認證碼後，自己的LINE帳號隨即遭到駭客接管，詐騙集團便會假冒被害人身分轉而向其他親友借錢。近期此類被害人數日益增加，台南市警局統計，今年1至3月累計已有149人遭詐。台南市警察局特別呼籲，只要看到要求輸入LINE密碼或認證碼的網頁就絕對是詐騙，請務必開啟雙重認證功能以自保。',
    link: '#',
  },
];
export default function Scam() {
  return (
    <>
      <section className="scam-section">
        <header className="scam-header">
          <h2 className="scam-section-title-zh">防詐騙宣導</h2>
          <p className="scam-section-title-en">Scam Prevention</p>
        </header>

        <div className="scam-content-wrapper">
          <div className="scam-panel">
            <div className="markPic" />

            <div className="scam-swiper-wrap">
              <Swiper
                className="scam-swiper"
                modules={[Pagination, Autoplay]}
                loop
                slidesPerView={1}
                centeredSlides
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{
                  clickable: true,
                  el: '.scam-pagination',
                }}
              >
                {/*  Slide 1  */}
                {scamData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <article className="scam-card">
                      <div className="scam-card__content">
                        <h3 className="scam-card__title">{item.title}</h3>
                        <p className="scam-card__text">{item.text}</p>
                        <Link to={item.link} className="scam-card__link">
                          繼續閱讀
                        </Link>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/*  pagination  */}
              <div className="scam-pagination" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
