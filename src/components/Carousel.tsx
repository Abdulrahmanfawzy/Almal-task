"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = ["/person.png", "/person.png", "/person.png"];

export default function Carousel() {
  return (
    <div className="w-[90%] relative my-10 mx-auto">
        <div className="absolute -bottom-10 inset-0 bg-[url('/layer.png')] bg-cover bg-center bg-no-repeat opacity-50 z-0" />

      <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000 }}
          className="rounded-lg"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                <div className="w-full md:w-1/2">
                  <img
                    src="/person.png"
                    alt="person image"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                  />
                  <h2 className="text-2xl font-semibold my-3">You're invited to SIGNAL 2021</h2>
                  <p className="text-gray-500">
                    Join us for the digital engagement event of the year bringing together 49,000+ developers, product leaders and visionaries to talk about the future of customer engagement.
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    src="/person.png"
                    alt="person image"
                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                  />
                  <h2 className="text-2xl font-semibold my-3">You're invited to SIGNAL 2021</h2>
                  <p className="text-gray-500">
                    Join us for the digital engagement event of the year bringing together 50,000+ developers, product leaders and visionaries to talk about the future of customer engagement.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* الأسهم */}
          <div className="swiper-button-prev custom-nav" />
          <div className="swiper-button-next custom-nav" />

          {/* استايل خاص للأسهم والنقاط */}
          <style jsx>{`
            .custom-nav {
              position: absolute;
              bottom: 0;
              top: auto;
              transform: none;
              color: black;
              z-index: 10;
              width: 20px;
            }

            .swiper-button-prev {
              left: 0%;
            }

            .swiper-button-next {
              right: 0%;
            }

            .swiper-button-prev:after,
            .swiper-button-next:after {
              font-size: 16px;
            }

            .swiper-pagination-bullet {
              background: black !important;
              opacity: 1;
            }

            .swiper-pagination-bullet-active {
              background: #000 !important;
            }
          `}</style>
      </Swiper>

    </div>
  );
}
