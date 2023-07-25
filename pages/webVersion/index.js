import React, { useEffect } from "react";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import Faq from "../webVersion/Faq";
import Footer from "../Common/WebVersionFooter/Footer";
import ReadyZouluFooter from "../Common/readyZouluFooter/ReadyZouluFooter";
import ContactUsFooter from "../Common/contactUsFooter/ContactUsFooter";
import styles from "../../styles/webVersion.module.css";
import ProfileSlide from "./ProfileSlide";
import { useState } from "react";
import YourApplication from "./applicationSteps/YourApplication";
import VerifyComplete from "./CompleteWebVerification";
import Overview from "./applicationSteps/OverviewModal";
import ApplicationComplete from "./applicationSteps/ApplicationComplete";
import { useRouter } from "next/router";
import Protected from "../../utils/ProtectedRoute";
import OtpVerificationModal from "./OtpVerificationModal";
import style from "../../styles/Home.module.css";
const Index = (props) => {
  const { profileStatus } = props;
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verifiedModal, setVerifiedModal] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [applicationComplete, setApplicationComplete] = useState(false);
  const [final, setfinal] = useState();
  const [progress, setProgress] = useState(25);
  const [valued, setValued] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [verfiedUser, setVerfiedUser] = useState(false);
  const [treatments, setTreatments] = useState();
  const [questions, setquestions] = useState();
  const [file, setfile] = useState();
  const [edit, setedit] = useState();
  const [role, setrole] = useState("expert");
  const router = useRouter();
  const handlerModal = () => {
    if (profileStatus?.profile) {
      if (profileStatus?.profile === true) {
        setShowApplicationModal(!showApplicationModal);
      }
    } else {
      setShowApplicationModal(!showApplicationModal);
    }
  };
  console.log(profileStatus);
  useEffect(() => {
    if (profileStatus?.profile === true) {
      setShowApplicationModal(true);
      setProgress(50);
    }
    if (profileStatus?.verified === false) {
      setShowVerification(true);
    }
  }, [profileStatus]);
  return (
    <Protected role={role}>
      <div className="mt-2 p-0">
        <div className={`${styles.BookingDiv} m-0 p-0`}>
          <div className={`${styles.PaddingHomeScreen} `}>
            <div className=" row m-0 p-0">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className={`${styles.PaddingLeft} mt-5 `}>
                  <div className={`${styles.MainText} mt-5`}>
                    Mit Zoulu Bist Du <br />
                    Dein
                    <span style={{ color: "#007FFF" }}> Eigener Chef.</span>
                  </div>
                  <div className={`${styles.ExpertsSlideText} mt-4 pt-1`}>
                    Trete noch heute unserem Zoulu-Netzwerk bei und verdiene
                    mehr Geld nach deinem eigenem Zeitplan.
                  </div>
                  {profileStatus?.isProfileApproved === true ? null : (
                    <div className={styles.flexCenterbutton}>
                      <ZouluButton
                        className={`${styles.BookNow} mt-4 `}
                        title="Jetzt Bewerben"
                        onClick={() => handlerModal()}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 ">
                <img
                  src={"/Images/werdenExpert.png"}
                  className={styles.RightPicimg}
                />
              </div>
            </div>
          </div>
        </div>
        {/* how it works  */}
        <div className={`${styles.PaddingWorkCards} `}>
          <div className={`${styles.DisplayDiv} mt-5`}>
            <div className={`${styles.HowItWorkText} `}>
              Mit Zoulu <span style={{ color: "#007FFF" }}> Kannst du</span> ...
            </div>
          </div>
        </div>
        {/* cards div */}
        <div className={`${styles.PaddingWorkCards} mt-5`}>
          <div className="row d-flex justify-content-evenly">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12 ">
              <div className={styles.CardContainer}>
                <div className="card-padding-div">
                  <img
                    src={"/Images/Rectangle4417.png"}
                    className={styles.CardPicture}
                  />
                  <div className={`${styles.CardHeading} mt-3`}>
                    Dein Einkommen maximieren
                  </div>
                  <div className={`${styles.SpaCardText} mt-3`}>
                    Erreiche mehr Kunden und genieße eine höhere Nachfrage -
                    Steigere dein Einkommen mit Zoulu.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12">
              <div className={styles.CardContainer}>
                <div className="card-padding-div">
                  <img
                    src={"/Images/RectangleMountain.png"}
                    className={styles.CardPicture}
                  />
                  <div className={`${styles.CardHeading} mt-3`}>
                    Arbeiten wann und Wo du Willst
                  </div>
                  <div className={`${styles.SpaCardText} mt-3`}>
                    Erreiche mehr Freiheit und Flexibilität - Bestimme deine
                    eigenen Zeiten und Bedingungen als Experte bei Zoulu.{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-8 col-12">
              <div className={styles.CardContainer}>
                <div className="card-padding-div">
                  <img
                    src={"/Images/RectangleLaptop.png"}
                    className={styles.CardPicture}
                  />
                  <div className={`${styles.CardHeading} mt-3`}>
                    Bisherige Kosten einsparen
                  </div>
                  <div className={`${styles.SpaCardText} mt-3`}>
                    Vermeide Miet- und Verwaltungskosten - Steigere deinen
                    Gewinn als mobiler Experte bei Zoulu und mach dir keine
                    Sorgen um Kundenaquise.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ColorDiv}></div>
        {/* provider */}
        <div
          className={`${styles.PaddingWorkCards}  pt-4 pb-5`}
          style={{ backgroundColor: "#f9f9f9 " }}
        >
          <div className="">
            <div className={` row`}>
              <div className={`${styles.ProviderText} col-lg-12 `}>
                <center>
                  Wie trete ich{" "}
                  <span style={{ color: "#007FFF" }}> Zoule bei</span>?
                </center>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className={styles.WhiteCardContainer1}>
                  <div
                    className={`${styles.marginBottomHeading} ${styles.WhiteCardHeading} `}
                  >
                    Registrieren
                  </div>
                  <div className={styles.WhiteCardText}>
                    Registriere dich auf unserer Website und gib deine
                    persönlichen Daten wie Name, Adresse und
                    Kontaktinformationen an, um dich bei Zoulu anzumelden.
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-2">
                <div className={styles.WhiteCardContainer}>
                  <div>
                    <div className={`${styles.WhiteCardHeading}`}>
                      Wähle deine Behandlungen
                    </div>
                    <div className={styles.WhiteCardText}>
                      Nach Deiner Registrierung kannst Du auswählen welche
                      Dienstleistungen Du anbieten möchtest und eventuell
                      erforderliche Qualifikationsnachweise hochladen.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-2">
                <div className={styles.WhiteCardContainer}>
                  <div>
                    <div className={`${styles.WhiteCardHeading} `}>
                      Setze deine Zeiten und Preise
                    </div>
                    <div className={styles.WhiteCardText}>
                      Nachdem Deine Qualifikationen überprüft wurden, erhältst
                      Du Zugang zu Deinem persönlichen Experten-Dashboard. Fülle
                      Deinen Terminkalender auf der Plattform aus und gib die
                      Preise für Deine Dienstleistungen an.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" pt-3">
          <div className={`${styles.PaddingWorkCards} `}>
            <div
              className={`${styles.ProviderText} ${styles.TextAlign} col-lg-12 `}
            >
              Was unsere{" "}
              <span style={{ color: "#007FFF" }}>Experten sagen....</span>
            </div>
          </div>
          <div className="row m-0 p-0" style={{ position: "relative" }}>
            <ProfileSlide />
          </div>
          <div className={`${styles.ColorDivSecond} mb-3`}></div>
        </div>
        {/* Faq Prt */}
        <div className={`${styles.PaddingWorkCards} ${styles.AddBg}`}>
          <div className={` row`}>
            <div className="col-lg-6 col-sm-12  col-md-6 col-12">
              <div className={styles.QuestionsPaddingWebVersion}>
                <div className={`${styles.MainTextWebVersion} `}>
                  Häufig
                  <span style={{ color: "#007FFF" }}> Gestellte Fragen </span>
                </div>
                <div className={`${styles.CommonPeragraphWeb}`}></div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12  col-md-6 col-12 pb-4">
              <Faq />
            </div>
          </div>
        </div>
        <div className={`${styles.PaddingWorkCards} ${styles.AddBg}`}>
          {/* <div className={` row pb-5 mb-3`}>
            <div className="col-lg-6 col-sm-12  col-md-6 col-12">
              <Faq />
            </div>
          </div> */}
        </div>
        {/* <ReadyZouluFooter /> */}
        <div className="container-fluid mt-5 p-0">
          <div className="row m-0 p-0">
            <div className="col-lg-6  contactViewFooter">
              <h2 className="contactViewHeading">Trete Nun Zoulu Bei!</h2>
              <h5 className="contactViewDetail">
                Sei dein eigener Chef und verdiene mehr Geld nach <br />{" "}
                <div className="mt-2">deinem eigenen Zeitplan</div>
              </h5>
              <div>
                {profileStatus?.isProfileApproved === true ? null : (
                  <ZouluButton
                    className={`${style.AddressButtonbook} mt-4 `}
                    title="Jetzt Bewerben"
                    onClick={() => handlerModal()}
                  />
                )}
              </div>
            </div>
            <div
              className="col-lg-6  contactViewRight"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              {" "}
              <h2 className="contactViewHeadingRight">Kontaktiere uns</h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  width: "66%",
                }}
              >
                <div className="contactviewDetail">
                  <div>
                    <img src="/Images/emails.png"></img>
                  </div>
                  <div style={{ margin: "10px" }}>
                    <div className="contactAdressTitile">Email:</div>
                    <div className="contactAdress">info@zoulu.de</div>
                  </div>
                </div>
                <div className="contactviewDetail ">
                  <div>
                    <img src="/Images/phones.png"></img>
                  </div>
                  <div style={{ margin: "10px" }}>
                    <div className="contactAdressTitile">Telefon:</div>
                    <div className="contactAdress">0201-123456</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="display-div-ready m-0 p-0">
          <Footer />
        </div>
        {showApplicationModal && (
          <YourApplication
            show={showApplicationModal}
            setShow={(e) => setShowApplicationModal(e)}
            setShowOverview={(e) => setShowOverview(e)}
            setShowVerification={(e) => setShowVerification(e)}
            showVerification={showVerification}
            verifiedModal={verifiedModal}
            setfinal={(e) => setfinal(e)}
            setPhoneNum={(e) => setPhoneNum(e)}
            setValued={(e) => setValued(e)}
            verifiedUser={verfiedUser}
            setfile={(e) => setfile(e)}
            setquestions={(e) => setquestions(e)}
            settreatments={(e) => setTreatments(e)}
            setProgress={(e) => setProgress(e)}
            progress={progress}
            profileStatus={profileStatus}
          />
        )}
        {showVerification && (
          <OtpVerificationModal
            show={showVerification}
            setShow={(e) => setShowVerification(e)}
            setVerifiedModal={(e) => setVerifiedModal(e)}
            final={final}
            phoneNum={phoneNum}
            valued={valued}
            profileStatus={profileStatus}
          />
        )}
        {verifiedModal && (
          <VerifyComplete
            show={verifiedModal}
            setShow={(e) => setVerifiedModal(e)}
            setValued={(e) => setValued(e)}
            setProgress={(e) => setProgress(e)}
            setShowApplicationModal={(e) => setShowApplicationModal(e)}
          />
        )}
        {showOverview && (
          <Overview
            show={showOverview}
            setShow={(e) => setShowOverview(e)}
            setApplicationComplete={(e) => setApplicationComplete(e)}
            file={file}
            questions={questions}
            treatments={treatments}
            setProgress={(e) => setProgress(e)}
            setShowApplicationModal={(e) => setShowApplicationModal(e)}
            edit={edit}
          />
        )}
        {applicationComplete && (
          <ApplicationComplete
            show={applicationComplete}
            setShow={(e) => setApplicationComplete(e)}
            setShowVerification={(e) => setShowVerification(e)}
          />
        )}
      </div>
    </Protected>
  );
};
export default Index;
