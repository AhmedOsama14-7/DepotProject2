import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore  from 'swiper';
import { EffectFade } from 'swiper/modules';
import { Autoplay  } from 'swiper/modules';
import PaginationContent1 from '../paginationContent/PaginationContent1';
import PaginationContent2 from '../paginationContent/PaginationContent2';
import PaginationContent3 from '../paginationContent/PaginationContent3';
import "swiper/css/bundle";
import "swiper/css";
import 'swiper/css/effect-fade';
SwiperCore.use([Autoplay ]);

const MySwiper = () => {
  const swiperRef = useRef(null); // Reference to the Swiper instance
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { id: 1, content: <PaginationContent1> </PaginationContent1> },
    { id: 2, content: <PaginationContent2></PaginationContent2>  },
    { id: 3, content: <PaginationContent3></PaginationContent3>  },
   
  ];


  const goToSlide = (index) => {
  
    if(swiperRef.current){
        swiperRef.current.swiper.slideTo(index)
        setCurrentIndex(index)
    }
  };

  const handleSlideChange = (swiper) => {
    
    const newIndex = swiper.realIndex; 
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
       onSlideChange={handleSlideChange}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        allowTouchMove={false} 
        style={{height:'100%'}}
        effect={'fade'}
      >
         <div className="content">
        {slides.map((slide) => (
          <SwiperSlide style={{ height:'100%'}} key={slide.id}>
          
              {slide.content}
           
          </SwiperSlide>
        ))}
      </div>
      </Swiper>
      
      <div className="pagination">
      {slides.map((slide, index) => (
        <button className={ ` ${currentIndex === index ? "active" : ""} `}  key={slide.id} style={{
            color: currentIndex === index ? '#080808' : '#929292',
        }} onClick={() => goToSlide(index)} >
           0{index+1}
           <div className={`line ${currentIndex === index ? "active" : ""} `}  ></div>

        </button>

      ))}
      </div>
      
     </> 
   
  );
};

export default MySwiper;
