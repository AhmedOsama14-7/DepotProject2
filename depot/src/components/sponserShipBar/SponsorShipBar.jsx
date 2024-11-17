import React ,{useState , useRef}from 'react'
import { getSponsors } from '../../api/api'
import Loader from '../loader/Loader'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore  from 'swiper';
import { EffectFade } from 'swiper/modules';
import { Autoplay  } from 'swiper/modules';
import "swiper/css/bundle";
import "swiper/css";
import 'swiper/css/effect-fade';

SwiperCore.use([Autoplay ]);

const  SponsorShipBar = () =>{
    const swiperRef = useRef(null); // Reference to the Swiper instance
    const [currentIndex, setCurrentIndex] = useState(0);
    
    
    const { data , isFetching } = getSponsors()
    
    if(isFetching) return <Loader></Loader>
    const handleSlideChange = (swiper) => {
    
        const newIndex = swiper.realIndex; 
        setCurrentIndex(newIndex);
      };
    
    return (
      <>
        <Swiper
          ref={swiperRef}
         onSlideChange={handleSlideChange}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={4}
          centeredSlides={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: true
            },
            660: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1220: {
              slidesPerView: 4,
            },
            1800: {
              slidesPerView: 5,

            },
            2400: {
              slidesPerView: 6,
            },
          }}
          loop={true}
          allowTouchMove={true} 
          style={{height:'100%'}}
          effect={'fade'}
        >
           
           <div className='sponsorShipBar'>
      {data?.data?.data?.map((sponsor) => (
        <SwiperSlide key={sponsor.documentId} style={{height:"100%"}} >

          <div className="img" style={{display:"flex" , justifyContent:"center"}}>
                <img src={sponsor.url} alt={sponsor.name} />
        </div>
        </SwiperSlide>
              ))}
        </div>
        
      
        </Swiper>
        
   
   
              </> 
  )
}
export default SponsorShipBar;