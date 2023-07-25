import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import ZouluButton from "./Common/ZouluButton/ZouluButton";
import Slider from "./home/Components/slider/Slider";
import Faq from "./home/Components/Faq";
import Footer from "./Common/Footer/Footer";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import styl from "../styles/homeNew.module.css";
import TrustSlider from "./home/Components/TrustSlider";
import Rating from "@mui/material/Rating";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactFooter from "./home/Components/contact/ContactFooter";
const Home = (props) => {
  const [value, setValue] = useState(4);
  const matches = useMediaQuery("(min-width:992px)");
  useEffect(() => {
    if (matches) {
    }
  }, [matches]);
  return (
    <div className="container-fluid p-0" id={"asd"}>
      {/* <Navbar /> */}
      <div className=" row m-0 p-0 ">
        <div className={`${styles.PaddingHomeScreenMain} row`}>
          <div className="col-lg-7 col-xl-7  col-md-12">
            <div className={styl.PaddingimgLeft}>
              {/* <div className={styl.HomeSalon}>
                Mobiler Service für Massage, Physiotherapie & Beauty
              </div> */}
              <div className={`${styl.MainText1} bigScreenHeading`}>
                <span style={{ color: "#007FFF" }}>
                  Massage<span style={{ color: "#000" }}>,</span> Beauty{" "}
                </span>{" "}
                und
                <br />
                <span style={{ color: "#007FFF" }}> Gesundheit</span>
                <span style={{ color: "#000" }}>. Hol es dir</span>
                <br />
                nach Hause.
              </div>
              <div className={`${styl.MainText1} SmallScreenHeading`}>
                <span style={{ color: "#007FFF" }}>
                  Massage<span style={{ color: "#000" }}>,</span> Beauty{" "}
                </span>{" "}
                und
                <span style={{ color: "#007FFF" }}> Gesundheit</span>
                <span style={{ color: "#000" }}>. Hol es dir </span>
                nach Hause.
              </div>

              <div className={`${styl.CommonPeragraphHead} mt-4 `}>
                Unsere zertifizierten Experten bringen deine Wunschbehandlung zu dir nach Hause, ins Hotel oder ins Büro <span style={{ color: "rgba(2, 124, 255, 1)" }}>•</span> Einfach{" "}
                <span style={{ color: "rgba(2, 124, 255, 1)" }}>•</span> Schnell <span style={{ color: "rgba(2, 124, 255, 1)" }}>•</span> Sicher
              </div>
              <div className={`${styles.CommonClass} `}>
                <Link href="/bookNow">
                  <ZouluButton title="Jetzt Buchen" className={styl.HeadHomeButton} />
                </Link>
                {/* <Link href="webVersion">
                  <div className={`${styl.LearnDivClass}`}>
                    Experte Werden
                    <img src={"/Images/learnicon.png"} className={styles.LearnIconClass} />
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-5 col-md-12 col-12">
            <img src={"/Images/Image.png"} className={styl.RightPic} />
          </div>
        </div>
      </div>
      <div className="row mt-5 p-0 m-0">
        <div className={`col-lg-12 mt-5 ${styl.FavoriteTreat}`}>
          Genieße deine <br /> <span style={{ color: "#007FFF" }}> Wunschbehandlung </span>
          Zu Hause
        </div>
        <center className="mt-5 pt-1">
          <div className="row widthHomeImages">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.MassageBg}`}>Massage</div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.PhysioBg}`}>Physio</div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.WimpernBg} ${styl.mrginBigScreen}`}>Wimpern & Brauen</div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.WaxingBg} ${styl.mrginBigScreen}`}>Waxing</div>
            </div>
          </div>
          <div className="row widthHomeImages" style={{ marginTop: "21px" }}>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.KosmetikBg} `}>Kosmetik</div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.NagelBg} `}>Nägel</div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.HairBg} ${styl.mrginBigScreen}`}>Haare</div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <div className={`${styl.bgImageContainer} ${styl.MakeupBg} ${styl.mrginBigScreen}`}>Makeup</div>
            </div>
          </div>
          {/* <div className="row widthHomeImages" style={{ marginTop: "21px" }}>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className={`${styl.bgImageContainer2} ${styl.BrowsBg}`}>Augenbrauen</div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className={`${styl.bgImageContainer2} ${styl.HealthBg} ${styl.MtSmall}`}>Physio</div>
            </div>
          </div> */}
        </center>
      </div>
      {/* how it works  */}
      <div className={`row ${styles.DisplayDivWrk}   m-0 p-0`}>
        <div className={`${styles.HowItWorkText} mt-3`}>Wie funktioniert Zoulu?</div>
        {/* <div className={`${styles.CommonPeragraph} mt-3`}></div> */}
      </div>
      {/* cards div */}
      <div className={`${styles.CardsDiv} mt-5 `}>
        <div className={`${styles.PaddingWorkCards}`}>
          <div className="row ">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className={styles.Card}>
                <div className={styles.CardPaddingDiv}>
                  <img src={"/Images/Card1.png"} className={styles.CrdImg} />
                  <div className={`${styles.CardHeading} mt-2`}>Wähle Deine behandlung</div>
                  <div className={` ${styles.CommonPeragraph} mt-2`}>Wähle eine von zahlreichen Behandlungen aus den Kategorien Massage, Physiotherapie und Beauty. Alles bei dir zu Hause.</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className={styles.ActiveCard}>
                <div className={styles.CardPaddingDiv}>
                  <img src={"/Images/Card2.png"} className={styles.CrdImg} />
                  <div className={`${styles.CardHeading} mt-2 `} style={{ color: "white" }}>
                    Wähle Deinen Experten{" "}
                  </div>
                  <div className={`${styles.CommonPeragraph} mt-2`} style={{ color: "white" }}>
                    Entscheide dich für einen unserer vielen zertifizierten Experten. Du kannst Profile, Bewertungen und Rezensionen durchsuchen.{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
              <div className={styles.Card1}>
                <div className={styles.CardPaddingDiv}>
                  <img src={"/Images/Card3.png"} className={styles.CrdImg} />
                  <div className={` ${styles.CardHeading} mt-2 `}>Wähle Ort Und Zeit</div>
                  <div className={`${styles.CommonPeragraph} mt-2`}>
                    Wähle aus wann und wo du deine Behandlung genießen willst. Du erkennst dabei auch welcher Experte zu der ausgewählten Zeit verfügbar ist.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.BackgroundColorSmall}></div>
        <div className={styles.marginBottomSlider}></div>
      </div>
      {/* slider area */}
      <div className={`mb-5 mt-3 ${styles.FlexContainer}`}>
        <div className={`${styles.ColorDivSlider}`}></div>
        <div className={styles.SliderWidth}>
          <Slider />
        </div>
      </div>
      <div className="row m-0 p-0 ">
        <div className={`${styl.TrustContainer} pb-4`}>
          <div className={styl.BoldTextContainer}>
            {/* <div className={styl.JoinText}>Join over 100,000 blyssed out Aussies</div> */}
            <div className={styl.AustText}>
              Zoulu - Die Plattform{" "}
              <span style={{ color: "#007FFF" }}>
                für mobile Massagen,{" "}
                <span className={styl.LineBr}>
                  <br />
                </span>
              </span>{" "}
              Beauty und Physiotherapie
            </div>
          </div>
          <div className={`${styl.SmallComtainer} mt-4 pt-4 mb-5 pb-4`}>
            <div className={styl.DisplayCol}>
              <div className={styl.ExcellentText}>
                Excellent - based on
                <div className={styl.reviewsMargin}> 0 review</div>
              </div>
              <Rating size="small" className={`${styl.RatingBlue}`} name="simple-controlled" value={1} readOnly />
              <div className={`${styl.TrustpilotMargin} d-flex`}>
                <img src={"/Images/tikicon.png"} className={styl.TikImage} />
                <div className={styl.TrustHeading}>Trustpilot</div>
              </div>
            </div>
          </div>
          <div className={`${styl.ProfSliderContainer}  m-0 p-0`}>{/* <TrustSlider /> */}</div>
        </div>
      </div>
      {/* blue bar  */}
      <div className={`${styles.BlueCardDiv} `}>
        <div className={`${styles.BlueCardHead} mt-3 pt-3`}>Zoulu - Die Plattform für mobile Massagen, Beauty und Physiotherapie</div>
        <div className={` ${styles.BlueCardText} mt-3`}>Trete heute noch unserem Zoulu-Netzwerk bei und arbeite als unabhängiger Therapeut zu deinen eigenen Bedingungen.</div>
        <Link href="/webVersion">
          <ZouluButton title="Jetzt Bewerben" className={`${styles.ColoredSignButton}`} />
        </Link>
      </div>
      {/* FAQ */}
      <div className={` row ${styles.BookingDiv}  m-0 p-0 `}>
        <div className="col-lg-6 ">
          <div className={styles.QuestionsPadding}>
            <div className={styles.MainTextFrequently}>Häufig gestellte Fragen</div>
            {/* <div className={`${styles.CommonPeragraphFrequently}  mt-4`}></div> */}
          </div>
        </div>
        <div className="col-lg-6">
          <div className={`${styles.LeftMargin} mb-3`}>
            <Faq />
          </div>
        </div>
      </div>
      {/* mobile div area  */}
      {/* <div className="row  pb-5 m-0 p-0 ">
        <div className="col-lg-7 col-md-6 col-sm-12 col-12 col-xxl-7  mt-4">
          <div className={styles.PaddingLeftPhone}>
            <div className={`${styles.Main3Text} ${styles.WidthPeragraph} `}>
              <span style={{ color: "#007FFF" }}>zoulu </span>Mobile App
            </div>
            <div className={`${styles.CommonPeragraphwidth} ${styles.WidthPeragraph} mt-1 ml-4`}>Book your next Blys session on the go with the Blys mobile app</div>
            <div className={`${styles.GoogleImage}  ${styles.WidthPeragraph} `}>
              <img src={"/Images/google.png"} className={styles.GooglePic} />
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 col-sm-12 col-xxl-5  col-12 mt-4 pb-4">
          <img src={"/Images/Iphone.png"} className={`${styles.RightPicSecond}`} />
        </div>
      </div> */}
      {/* footer */}
      <div className="pl-5 ml-5 ">
        <ContactFooter />
      </div>
      <div className={`${styles.DisplayDivReady} `}>
        <Footer categories={props?.categories} />
      </div>
    </div>
  );
};

export default Home;
