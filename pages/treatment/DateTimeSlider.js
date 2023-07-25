import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../../styles/treatment.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Pagination]);
const array = [
  {
    hour: "00:00",
  },
  {
    hour: "01:00",
  },
  {
    hour: "02:00",
  },
  {
    hour: "03:00",
  },
  {
    hour: "04:00",
  },
  {
    hour: "05:00",
  },
  {
    hour: "06:00",
  },
  {
    hour: "07:00",
  },
  {
    hour: "08:00",
  },
  {
    hour: "09:00",
  },
  {
    hour: "10:00",
  },
  {
    hour: "11:00",
  },
  {
    hour: "12:00",
  },
  {
    hour: "13:00",
  },
  {
    hour: "14:00",
  },
  {
    hour: "15:00",
  },
  {
    hour: "16:00",
  },
  {
    hour: "17:00",
  },
  {
    hour: "18:00",
  },
  {
    hour: "19:00",
  },
  {
    hour: "20:00",
  },
  {
    hour: "21:00",
  },
  {
    hour: "22:00",
  },
  {
    hour: "23:00",
  },
];
export default function DateTimeSlider(props) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slides, setSlides] = useState(
    Array.from({ length: 30 }).map((_, index) => ({
      time: "12:30",
    }))
  );
  const handlerValues = (e, index) => {
    if (index === selectedDate) {
      setSelectedDate();
      props?.setBookingTime(e);
    } else {
      setSelectedDate(index);
      props?.setBookingTime(e);
    }
  };
  useEffect(() => {
    if (props?.cart?.start_time && props?.cart?.availableExpert) {
      props?.setExpert(props?.cart?.availableExpert[props.cart.start_time]);
    }
  }, [props?.cart?.availableExpert]);
  return (
    <>
      <Swiper
        className="time-slider-container"
        onSwiper={setSwiperRef}
        slidesPerView={10}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          630: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 9,
            spaceBetween: 30,
          },
        }}
      >
        {props?.cart?.availableExpert ? (
          Object?.keys(props?.cart?.availableExpert)?.map((e, index) => (
            <SwiperSlide
              key={index}
              className={styles.SwiperSliderDate}
              onClick={() => {
                console.log(e);
                props?.setExpert(props?.cart?.availableExpert[e]);
                props?.setBookingTime(e);
                setSelectedDate(index);
              }}
              style={props?.cart?.start_time === e ? { backgroundColor: "#007FFF", cursor: "pointer" } : { cursor: "pointer" }}
            >
              <div>
                <div className={`${styles.TimeContainer} datesliderdate`} style={props?.cart.start_time === e ? { color: "white", marginLeft: "-3px" } : { color: "black", marginLeft: "-3px" }}>
                  {e}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : props?.cart?.start_timee ? (
          <SwiperSlide className={styles.SwiperSliderDate} style={props?.cart?.start_time === props?.cart?.start_time ? { backgroundColor: "#007FFF", cursor: "pointer" } : { cursor: "pointer" }}>
            <div>
              <div
                className={`${styles.TimeContainer} datesliderdate`}
                style={props?.cart?.start_time === props?.cart?.start_time ? { color: "white", marginLeft: "-3px" } : { color: "black", marginLeft: "-3px" }}
              >
                {props?.cart?.start_time}
              </div>
            </div>
          </SwiperSlide>
        ) : null}
      </Swiper>
    </>
  );
}
