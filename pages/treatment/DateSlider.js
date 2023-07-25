import React, { useEffect, useRef, useState } from "react";
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../../styles/treatment.module.css";
import moment from "moment";
import "moment/locale/de";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Api } from "../../utils/Api";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
SwiperCore.use([Virtual, Navigation, Pagination]);
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GermanDays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

const GermanMonths = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
const DateSlider = (props) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const today = new Date();
  const next30Days = [];
  for (let i = 0; i < 60; i++) {
    next30Days.push(new Date(today.getTime() + i * 24 * 60 * 60 * 1000));
  }
  var time = next30Days?.map((data, index) => {
    return {
      day: new Date(data).getDay(),
      date: new Date(data).getDate(),
      month: [new Date(data).getMonth()],
      year: new Date(data).getFullYear(),
    };
  });
  const handlerValues = (e, index) => {
    if (index === selectedDate) {
      setSelectedDate();
      props?.setBookingDate(e);
      getbooking(props?.value, props?.location, index);
    } else {
      setSelectedDate(index);
      props?.setBookingDate(e);
      getbooking(props?.value, props?.location, index);
    }
  };
  useEffect(() => {
    console.log(props?.cart.expert_id, props?.cart?.service_id?._id, props?.cart?.date, props?.location);
    if (props?.cart.expert_id && props?.cart?.service_id?._id && props?.cart?.date && props?.location) {
      getbooking("value", props?.location, "1", props?.cart?.date, props?.cart?.category_id, props?.cart?.service_id?._id);
    }
  }, [props?.location]);
  const getbooking = async (value, location, index, cartDate, cartCategoryid, cartServiceid) => {
    setLoader(true);
    if (!cartDate) {
      props?.setBookingTime();
      props?.setAvailableExpert();
      props?.setExpert();
      props?.setBookingExpert();
    }

    if (cartDate) {
      var date = moment(cartDate).format("YYYY-MM-DD");

      props?.setDate(date);
    } else {
      var makeFormat = value?.selectedDate?.date + " " + month[value?.selectedDate?.month] + "," + value?.selectedDate?.year;
      var date = moment(makeFormat).format("YYYY-MM-DD");
      props?.setDate(date);
    }

    props?.setDate(date);
    const payload = new FormData();
    payload.append("categoryId", props?.value?.service_id?.category_id?._id || props?.value?.category_id || cartCategoryid);
    payload.append("serviceId", value?.service_id?._id || cartServiceid);
    payload.append("date", date);
    payload.append("packages", JSON.stringify(props?.cart?.packages?.map((e) => e?.package_id._id)) || JSON.stringify(value?.packages?.map((e) => e?.package_id._id)));

    payload.append("coordinates", JSON.stringify(location));
    const response = await Api("post", `api/expert/availability`, payload);
    if (response.status === 200) {
      setLoader(false);
      props?.setAvailableExpert(response.data.data);
      if (Object.keys(response.data.data)?.length === 0) {
        setLoader(false);
        toast.warning("There are no expert available");
      }
    } else {
      setLoader(false);
      toast.warning("There are no expert available");
    }
  };
  return (
    <>
      {loader ? <Loader /> : null}
      <Swiper
        className="date-slider-container"
        onSwiper={setSwiperRef}
        slidesPerView={11}
        spaceBetween={27}
        navigation={true}
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          300: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          400: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          500: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          630: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 25,
          },
          1200: {
            slidesPerView: 9,
            spaceBetween: 25,
          },
        }}
      >
        {time?.map((slideContent, index) => (
          <>
            <SwiperSlide key={index} virtualIndex={index} className={styles.SwiperSlider} onClick={() => handlerValues(slideContent, index)} style={{ cursor: "pointer" }}>
              <div
                style={{
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {console.log(
                  moment(props?.cart?.date).locale("de").format("dddd").slice(0, 3),
                  GermanDays[slideContent.day].slice(0, 3),
                  "==",
                  moment(props?.cart?.date).locale("de").format("MMMM").slice(0, 3),
                  GermanMonths[slideContent.month].slice(0, 3),
                  moment(props?.cart?.date).format("DD"),
                  slideContent.date
                )}
                <p
                  style={
                    props?.cart?.date
                      ? {
                          color:
                            moment(props?.cart?.date).locale("de").format("dddd").slice(0, 3) == GermanDays[slideContent.day].slice(0, 3) &&
                            moment(props?.cart?.date).locale("de").format("MMMM").slice(0, 3) == GermanMonths[slideContent.month].slice(0, 3) &&
                            moment(props?.cart?.date).format("DD") == slideContent?.date
                              ? "#007FFF"
                              : "#a3a3a3",
                        }
                      : { color: "#a3a3a3" }
                  }
                >
                  {GermanDays[slideContent?.day].slice(0, 3)}
                </p>
                <p
                  className="dateslidermaindate"
                  style={
                    props?.cart?.date &&
                    moment(props?.cart?.date).format("DD") == slideContent?.date &&
                    moment(props?.cart?.date).locale("de").format("MMMM").slice(0, 3) == GermanMonths[slideContent?.month].slice(0, 3)
                      ? {
                          color: "#007FFF",
                          marginLeft: "4px",
                        }
                      : {
                          color: "#a3a3a3",
                          marginLeft: "4px",
                        }
                  }
                >
                  {slideContent?.date}
                </p>
                <p
                  style={
                    props?.cart?.date &&
                    moment(props?.cart?.date).format("DD") == slideContent?.date &&
                    moment(props?.cart?.date).locale("de").format("MMMM").slice(0, 3) == GermanMonths[slideContent?.month].slice(0, 3)
                      ? {
                          color: "#007FFF",
                        }
                      : {
                          color: "#a3a3a3",
                        }
                  }
                >
                  {GermanMonths[slideContent?.month].slice(0, 3)}
                </p>
              </div>
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </>
  );
};
export default DateSlider;
