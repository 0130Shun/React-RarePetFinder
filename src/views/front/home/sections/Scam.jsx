//防詐宣導區section
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
const scamData = [
  {
    id: 1,
    title: "【每日揭詐】01/12 愛心被利用！「假送養寵物真詐騙」慣用招數曝光",
    text: "防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...,防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...,防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...,防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...,防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...,防詐中心公布最新統計資料，11/12全國共受理457件詐騙案件，財產損失金額高達新台幣2億5487.5萬元...台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元..台幣2億5487.5萬元.. ",
    link: "#"
  },
  {
    id: 2,
    title: "養​寵物​可​領​3000​元​補助？​農業部​公布​「不​會​被​騙」​的​查詢​補助​方式",
    text: "近​日​網​路​上​流傳​「養​寵物​也​能​領​補助！​2025​寵物​津貼​開放​申請」​的​消息，​引發​不​少​飼主關注。​對此，​農業部​發布​新​聞稿​說明​了。​農業部​17日​發布​新​聞稿​指出，​近期​有​詐騙​集團​冒用​政府​名義，​聲稱​提供​「寵物​津貼」​或​「3000​元​現金​補助」，​實際​上​是​要​騙取個人·····",
    link: "#"
  },
  {
    id: 3,
    title: "網購​寵物​患病率​高?​ ​慎防寵釣魚詐騙！",
    text: "愈​來愈多​家庭​飼養​寵物，​並視​牠們​為家​中​一​份子，​寵愛​程度​與子​女​無異。​在​本港，​除了​持牌​寵物​店售​賣​貓​狗外，​近年​不​少​社交媒​體​平​台出現疑似​出售​聲稱​自家​繁殖​貓狗​的​帖文，​並經常​以​貓狗​的​相片​或​影片​吸引​買家。​然而，​這些​貓狗​的​來源​成疑，​甚至​可能​涉及​非法​販賣​或​「寵物釣·····",
    link: "#"
  },
  {
    id:4,
    title:"LIN​E傳​「幫忙​投票」​小心​有​詐 南市​ 149人​遭騙",
    text:"詐騙​集團​利用​民眾​已​被​盜用​親友​LINE​帳號，​以​「支持​女​兒​作品」、​「幫​寵物​投票」​為由，​傳送​假連結誘導民眾​點擊​登入​假​頁面，​輸入​帳號、​密碼​及​認證碼，​帳號​隨即​遭盜，​轉而​再​向​親友​借錢，​近期​被​害人​日益​增加；​台南市​警局​統計，​今年​1​至​3月​累計​有​149人​遭詐。​台南市​警察局​今前往​台·····",
    link:'#'
  }
];
export default function Scam() {
  const paginationRef = useRef(null);
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
                autoplay={{ delay: 20000, disableOnInteraction: false }}
                pagination={{
                  clickable: true,
                  el: paginationRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.pagination.el = paginationRef.current;
                }}
              >
                {/*  Slide 1  */}
                {scamData.map((item) => (
                  <SwiperSlide key={item.id}>
                    <article className="scam-card">
                      <div className="scam-card__content">
                        <h3 className="scam-card__title">{item.title}</h3>
                        <p className="scam-card__text">{item.text}</p>
                        <a href={item.link} className="scam-card__link">
                          繼續閱讀
                        </a>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
              {/*  pagination  */}
              <div ref={paginationRef} className="scam-pagination" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
