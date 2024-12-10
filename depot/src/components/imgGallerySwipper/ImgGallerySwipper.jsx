import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-fade";
import { PiCaretLeftBold } from "react-icons/pi";
import { PiCaretRightBold } from "react-icons/pi";
import { HiXMark } from "react-icons/hi2";
import { Navigation } from "swiper/modules"; // Import the navigation module
export default function ImgGallerySwipper({ img1, img2, img3, img4, img5 }) {
  const slides = [
    { id: 1, content: img1 },
    { id: 2, content: img2 },
    { id: 3, content: img3 },
    { id: 4, content: img4 },
    { id: 5, content: img5 },
  ];
  const swiperRef = useRef(null); // Reference to the Swiper instance
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(slides.length);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setCurrentIndex(newIndex);
  };

  function slideChangeInc(e) {
    if (currentSlide < 4) {
      setCurrentSlide(currentSlide + 1);
      e.stopPropagation();
      e.preventDefault();
    } else {
      setCurrentSlide(1);
      e.stopPropagation();
      e.preventDefault();
    }
  }
  function slideChangeDec(e) {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      e.stopPropagation();
      e.preventDefault();
    } else {
      setCurrentSlide(slides.length);

      e.stopPropagation();
      e.preventDefault();
    }
  }

  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
        spaceBetween={150}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        style={{ height: "80%" }}
        effect={"fade"}
      >
        <div className="swipperContainer">
          <div className="content">
            {slides.map((slide) => (
              <SwiperSlide style={{ height: "90%" }} key={slide.id}>
                {slide.content}
              </SwiperSlide>
            ))}
          </div>
        </div>

        <div className="navigation">
          <div className="navigationBtns">
            <PiCaretLeftBold
              className="swiper-button-prev"
              onClick={slideChangeDec}
            />
            <PiCaretRightBold
              className="swiper-button-next"
              onClick={slideChangeInc}
            />
          </div>

          <div className="slideNo">
            <p>
              {currentSlide} / {totalSlides}
            </p>
          </div>

          <div className="Xmark">
            <HiXMark />
          </div>
        </div>
      </Swiper>
    </>
  );
}
