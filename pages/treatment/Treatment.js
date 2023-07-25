import React from "react";
import styles from "../../styles/treatment.module.css";
import Link from "next/link";
const Treatment = () => {
  return (
    <div className={`${styles.Container}`}>
      <span className={styles.TreatmentHeading}>Massage</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <Link href="/treatment/TreatmentDetail">
                <span className={styles.TreatmentText} style={{ cursor: "pointer" }}>
                  Relaxing Massage
                </span>
              </Link>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Deep Tissue Massage </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Lymphatic Drainage</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Pregnancy Massage</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>De-Stress Massage </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Organic Massage</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={`${styles.TreatmentText}  `}>NEOM De-stress Massage </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Reflexology</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Energising Massage</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Pain Relieving Massage </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={`${styles.TreatmentText} ${styles.ManageForSmall}`}>NEOM Perfect Night’s Sleep Massage</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Sports Massage</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  nails*/}
      <span className={styles.TreatmentHeading}>Nails</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Classic Manicure</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Classic Pedicure </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Gel Manicure </span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Gel Polish Removal </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Gel Manicure & Gel Pedicure </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Gel Pedicure</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={`${styles.TreatmentText} ${styles.ManageForSmall} `}>Gel Manicure & Classic Pedicure </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={`${styles.TreatmentText} ${styles.ManageForSmall} `}>Classic Manicure & Classic Pedicure</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={`${styles.TreatmentText} ${styles.ManageForSmall} `}>Gel Polish Removal Hands & Feet</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Spray tan*/}
      <span className={styles.TreatmentHeading}>Spray Tan</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4 col-md-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Spray Tan</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Express Spray Tan </span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Waxing*/}
      <span className={styles.TreatmentHeading}>Waxing</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Eyebrow Wax or Threading</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Brazilian Bikini Wax</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Hollywood Bikini Wax</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>High Bikini Wax</span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Leg Wax</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Leg & Bikini Wax</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Under Arms Wax </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Arm Wax </span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Chin Wax</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Lip Wax </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Brow & Lip Wax</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Brow, Lip & Chin Wax </span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Facial*/}
      <span className={styles.TreatmentHeading}>Facial</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Classic Facial </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>NEOM Perfect Night’s Sleep Facial</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>OSKIA Glow On The Go Facial</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Decléor Vitamin Glow Facial </span>
            </div>
          </div>
          <div className="col-lg-8" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Decléor Ultimate Vitamin Glow Facial (with back massage) </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>OSKIA Ultra Revitalising Facial</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>NEOM Perfect Night’s Sleep Facial with 30 minute massage </span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Lashes*/}
      <span className={styles.TreatmentHeading}>Lashes</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Lash Tint</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Lash Lift & Tint</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Lash Extensions (Full) </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Lash Extension Removal </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Lash Extensions (Infill) </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Lymphatic Drainage</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Pregnancy Massage</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  hair*/}
      <span className={styles.TreatmentHeading}>Hair</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className={`col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 p-0`}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Blow Dry</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Blow Dry & Styling </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Dry Styling</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Up Do </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6  p-0">
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Brazilian Blow Dry </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Bridal Hair </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Bridal Hair Trial</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Make-up*/}
      <span className={styles.TreatmentHeading}>Make-Up</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4  p-0">
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Natural Make-Up</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Glamorous Make-Up</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Bridal Make-up </span>
            </div>
          </div>
          <div className="col-lg-4  p-0">
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Natural Make-Up & Blow Dry </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Glamorous Make-Up & Hair </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Bridal Make-up Trial</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Brows*/}
      <span className={styles.TreatmentHeading}>Brows</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4  p-0">
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Eyebrow Wax or Threading </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Eyebrow Tintv </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Eyebrow Tint & Tidy</span>
            </div>
          </div>
          <div className="col-lg-4  p-0">
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>LVL Lash Lift by Nouveau Lashes </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>Lash & Eyebrow Tint </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Lash Tint, Eyebrow Tint & Tidy </span>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/*  Health*/}
      <span className={styles.TreatmentHeading}>Health</span>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "-22px" }}>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>The Classic IV Drip </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>The Vitamin IV Drip</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Deluxe Recovery IV Drip </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Under The Weather IV Drip </span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>The Fat Burner IV Drip </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>The Jet Lag Reset IV Drip </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>The Beauty Tonic IV Drip</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Limitless Brain Booster IV Drip </span>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-6 col-6" style={{ padding: 0 }}>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>COVID-19 Antibody Test </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotTwo}></div>
              </div>
              <span className={styles.TreatmentText}>COVID-19 Swab Test </span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotThree}></div>
              </div>
              <span className={styles.TreatmentText}>Well Woman Consultation</span>
            </div>
            <div className={styles.Display}>
              <div className={styles.AllDotsContainer}>
                <div className={styles.TreatmentDotOne}></div>
              </div>
              <span className={styles.TreatmentText}>Well Man Consultation </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
