import React, { useState, useRef } from "react";
import styles from "../../../styles/profile.module.css";
import Rating from "@mui/material/Rating";
import style from "../../../styles/homeNew.module.css";
import { MdOutlineVerifiedUser } from "react-icons/md";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Swiper, SwiperSlide } from "swiper/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { useRouter } from "next/router";
const TrustSlider = () => {
  const xl_screen = useMediaQuery("(min-width:1440px)");
  const lg_screen = useMediaQuery("(min-width:1024px)");
  const tab_screen = useMediaQuery("(min-width:768px)");
  const col_sm = useMediaQuery("(min-width:450px)");
  const small = useMediaQuery("(min-width:300px)");
  const SliderCard = (index) => {
    return (
      <div className={`${index == 1 ? `${style.sliderCardContainer} ${style.Sliderfooter}` : style.sliderCardContainer}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <Rating size="small" className={style.CardRating} name="simple-controlled" value={5} readOnly />
        </div>
        <div className={style.sliderContent}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout of using Lorem Ipsum.</div>
        <div className={style.SliderFooter}>
          <div>
            <img src={"/Images/profile.png"} className={style.sliderCardImg} />
          </div>
          <div className={style.NameContainer}>
            <div className={style.ClientName}>Rosh Tailor</div>
            <div className={style.ClientDesignation}>UI/UX Designer</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="blueCardDot">
      <div className={style.trustswipercont}>
        <Swiper
          className={`${style.SwiperTrust}  profileViewSliderContainer `}
          spaceBetween={2}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={xl_screen ? 2 : lg_screen ? 2 : tab_screen ? 1 : small ? 1 : col_sm ? 1 : 1}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        >
          {[1, 2, 3, 4].map((e, index) => (
            <SwiperSlide key={index} style={{ paddingBottom: "10px", paddingTop: "30px" }}>
              {SliderCard(index)}
            </SwiperSlide>
          ))}
          <div className={`${styles.Arrows} d-flex justify-content-between`}>
            <div className={`${styles.ArrowOne} `}>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true">
                  <KeyboardArrowLeftIcon className={styles.IconClassblack} />
                </span>
              </a>
            </div>
            <div className={`${styles.ArrowOne}`}>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true">
                  <KeyboardArrowRightIcon className={styles.IconClass1} />
                </span>
              </a>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default TrustSlider;
