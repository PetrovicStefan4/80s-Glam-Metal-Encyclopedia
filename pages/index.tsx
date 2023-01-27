import PageCard from "../components/common/PageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper";

export default function Home() {
  return (
    <main>
      {/* <div className="relative bg-blend-darken	">
        <Swiper
          slidesPerView={1}
          effect={"fade"}
          modules={[EffectFade, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          loop={true}
        >
          <SwiperSlide>
            <div>

            </div>
            <img src="./images/slides/slide1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/slides/slide2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/slides/slide3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/slides/slide4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/slides/slide5.jpg" />
          </SwiperSlide>
        </Swiper>
        <div></div>
      </div> */}

      <div className="relative">
        <div className="opacity-90 bg-gray-600">
          <img src="./images/slides/slide5.jpg" />
        </div>
        <div className="absolute top-0 right-0 left-0 z-index-10">
          <div className={"container mx-auto mt-24"}>
            <h1 className="text-6xl text-red-500 mb-10">Sleaze Alleycat</h1>
            <p className="text-white text-2xl">
              This app is tribute to the greatest genre from the 80s and early
              90s.
            </p>
            <p className="text-white text-2xl mb-5">
              This app collects best albums, bands and clubs that were popular
              during that period.
            </p>
            <div className={"flex justify-start py-3 mb-5"}>
              <PageCard title={"Bands"} link={"/bands"} />
              <PageCard title={"Albums"} link={"/albums"} />
              <PageCard title={"Record Labels"} link={"/record-labels"} />
              <PageCard title={"Clubs"} link={"/clubs"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
