import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../../styles/webVersion.module.css";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
export default function App() {
  const [value, setValue] = React.useState(1);
  return (
    <div className="profileSlider-ButonContainer">
      <Swiper
        className={`${styles.headSwiperContainer} ${styles.SwiperContainer} pros-say-slider-container greenCardDot`}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          // 280: { slidesPerView: 1,  },
          540: { slidesPerView: 1 },
          600: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1400: { slidesPerView: 3, spaceBetween: 5 },
        }}
        modules={[Pagination, Navigation, Mousewheel, Keyboard]}
      >
        <div className={` ${styles.swiperWrapper} swiper-wrapper`}>
          <SwiperSlide>
            <div className={styles.SliderHeight}>
              <div className={styles.SliderProfileStyle}>
                <img
                  src="/Images/imageSlider2.png"
                  className={`${styles.ProfileSliderImage} mt-1`}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className={styles.ProfileSliderHeading}>J. Nguyen</div>
                  <div className={styles.ProfileSlider2ndHeading}>
                    Masseurin
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className={styles.ProfileSliderText}>
                  Als spezialisierte Masseurin für Schwangere habe ich mich bei
                  Zoulu angemeldet, um meine Dienstleistungen mobil anzubieten.
                  Seitdem ich Teil von Zoulu bin, habe ich eine Vielzahl von
                  neuen Kunden gewonnen und konnte meine Dienstleistungen
                  flexibler anbieten. Besonders für schwangere Frauen ist die
                  Möglichkeit, eine Massage in ihrem eigenen Zuhause zu
                  erhalten, sehr vorteilhaft und angenehm. Ich empfehle Zoulu
                  jedem Therapeuten, der nach neuen Möglichkeiten sucht, sein
                  Einkommen zu erhöhen und seine Arbeit flexibler zu gestalten
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.SliderHeight}>
              <div className={styles.SliderProfileStyle}>
                <img
                  src="/Images/imageSlider1.png"
                  className={`${styles.ProfileSliderImage} mt-1`}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className={styles.ProfileSliderHeading}>L. Schmitt</div>
                  <div className={styles.ProfileSlider2ndHeading}>
                    Nageldesignerin
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className={styles.ProfileSliderText}>
                  Mit dem Ziel, meine Dienstleistungen mobil anzubieten, habe
                  ich mich als Nageldesignerin bei Zoulu registriert. Seitdem
                  ich Teil dieser Plattform bin, konnte ich meine Kundenbasis
                  erweitern und meine Arbeit flexibler gestalten. Es ist
                  großartig zu sehen, wie zufrieden meine Kunden sind, wenn sie
                  meine Arbeit in ihrer eigenen Komfortzone genießen können. Ich
                  würde Zoulu jedem Nageldesigner empfehlen, der seine
                  Reichweite erhöhen und seine Arbeit flexibler gestalten
                  möchte.
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.SliderHeight}>
              <div className={styles.SliderProfileStyle}>
                <img
                  src={"/Images/imageSlider.png"}
                  className={`${styles.ProfileSliderImage} mt-1`}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className={styles.ProfileSliderHeading}>E. Madien</div>
                  <div className={styles.ProfileSlider2ndHeading}>
                    Masseurin
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className={styles.ProfileSliderText}>
                  Ich bin seit einigen Monaten bei Zoulu als mobile
                  Massagethreapeutin registriert und es hat meine Arbeit als
                  Selbststandige sehr erleichtert.Durch die Plattform habe ich
                  meine Kundenbasis erweitern konnen und habe jetzt regelmaBige
                  Buchungen.
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.SliderHeight}>
              <div className={styles.SliderProfileStyle}>
                <img
                  src={"/Images/sliderImage1.png"}
                  className={`${styles.ProfileSliderImage} mt-1`}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className={styles.ProfileSliderHeading}>R. Samith</div>
                  <div className={styles.ProfileSlider2ndHeading}>
                    Physiotherapeut
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className={styles.ProfileSliderText}>
                  Ich bin Physiotherapeut und habe mich bei Zoulu angemeldet, um
                  meine Dienstleistungen auch mobile anzubieten.Es hat sich als
                  groBer Erfolg herausgestellt.Ich habe viele neue Kunden
                  gewonnen und kann meine Dienstleistungen jetzt flexibler
                  anbieten.{" "}
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.SliderHeight}>
              <div className={styles.SliderProfileStyle}>
                <img
                  src={"/Images/learn1.png"}
                  className={`${styles.ProfileSliderImage} mt-1`}
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <div className={styles.ProfileSliderHeading}>M. Maria</div>
                  <div className={styles.ProfileSlider2ndHeading}>
                    Kosmetikerin
                  </div>
                </div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className={styles.ProfileSliderText}>
                  Durch Zoulu kann ich als Kosmetikerin meine Dienstleistungen
                  nun flexibler anbieten und meine Arbeitszeiten selbst
                  bestimmen. Ich habe viele zufriedene Kunden durch die
                  Plattform gewonnen und würde jederzeit wieder mit Zoulu
                  arbeiten.
                </div>
              </div>
            </div>
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
}
