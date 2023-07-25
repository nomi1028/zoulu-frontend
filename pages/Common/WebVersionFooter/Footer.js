import React, { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import { FiLinkedin } from "react-icons/fi";
import { Api } from "../../../utils/Api";
import Link from "next/link";
const Footer = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const response = await Api("get", `api/category?page=${1}&limit=10`);
    if (response.status === 200) {
      console.log(response?.data?.data);
      setCategories(response?.data?.data);
      servicesHandler();
    }
  };
  const servicesHandler = () => {
    const array = [];
    categories?.map((data, index) => {
      if (data?.services?.length > 0) {
        data?.services?.map((service) => {
          array.push(service);
        });
      }
    });
    return array;
  };
  return (
    <>
      <div
        className={`${styles.PaddingfooterScreen} `}
        style={{
          backgroundColor: "#06152D",
          color: "white",
          width: "100%",
          paddingTop: "67px",
          paddingBottom: "30px",
        }}
      >
        <div className="row">
          <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12 col-12 ">
            <div className="footerzoluLogo">
              {" "}
              <img src={"/Images/logo.png"} alt="abc"></img>
            </div>
            <div className="footerText">Alle Experten bei Zoulu sind unabhängige und zertifizierte Therapeuten</div>
            <div style={{ display: "flex" }}>
              <div className={styles.SocialMedia}>
                <img src={"/Images/fb.png"}></img>
              </div>
              <div className={styles.SocialMedia}>
                <img src={"/Images/tw.png"}></img>
              </div>
              <div className={styles.SocialMedia}>
                <img src={"/Images/insta.png"}></img>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3  col-md-3 col-sm-4   col-6  ">
            <div>
              <div className="ListHeading">Über Zoulu</div>
              <Link href="/webVersion">
                <div className="footerItems mt-2 pt-1">Experte Werden</div>
              </Link>
              <div className="footerItems">Über Zoulu</div>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3  col-md-3 col-sm-4  col-6 laptopeView ">
            <div>
              <div className="ListHeading">Behandlungen</div>
              {categories?.map((data, index) => {
                if (index < 5) {
                  return <div className={index === 0 ? "footerItems mt-2 pt-1" : "footerItems"}>{data?.name}</div>;
                }
              })}
            </div>
          </div>
          <div className="col-lg-2 col-xl-2  col-md-3 col-sm-4   col-6  ">
            <div>
              <div className="ListHeading">Rechtliches</div>
              <Link href="/terms&Conditions">
                <div className="footerItems">AGB</div>
              </Link>
              <Link href="/privacy">
                <div className="footerItems">Datenschutzerklärung</div>
              </Link>
              <div className="footerItems">Impressum</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
// import styles from "../../../styles/webVersionFooter.module.css";
// import { FiFacebook } from "react-icons/fi";
// import { AiOutlineTwitter } from "react-icons/ai";
// import { AiOutlineInstagram } from "react-icons/ai";
// import ZouluButton from "../../Common/ZouluButton/ZouluButton";
// import { FiLinkedin } from "react-icons/fi";
// const Footer = () => {
//   return (
//     <div
//       className={`${styles.webversionFooterMargin} `}
//       style={{ backgroundColor: "#faf7f3" }}
//     >
//       <div className="row">
//         <div className="col-xl-3 col-lg-3 col-md-12 mt-4">
//           <h4 className={styles.FooterHeading}>ZOULU</h4>
//           <div className={`${styles.FooterText}`}>Alle Wellnessanbieter auf Blys sind unabhängig und hochqualifiziert.</div>
//           <div className="d-flex m-0 p-0 mt-5">
//             <div className={styles.SocialMedia}>
//               <FiFacebook />
//             </div>
//             <div className={styles.SocialMedia}>
//               <AiOutlineTwitter />
//             </div>
//             <div className={styles.SocialMedia}>
//               <AiOutlineInstagram />
//             </div>
//             <div className={styles.SocialMedia}>
//               <FiLinkedin />
//             </div>
//           </div>
//         </div>
//         <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6  col-xs-6  mt-4">
//           <div className={styles.ManageFooter}>
//             <h4 className={styles.FooterHeading}>Menu</h4>
//             <div className={styles.FooterText}>Behandlungen</div>
//             <div className={styles.FooterText}>Impressum</div>
//             <div className={styles.FooterText}>Für Unternehmen</div>
//             <div className={styles.FooterText}>Jetzt Experte werden</div>
//           </div>
//         </div>
//         <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-xs-6  mt-4">
//           <div className={styles.ManageFooter}>
//             <h4 className={styles.FooterHeading}>Services</h4>
//             <div className={styles.FooterText}>Nägel</div>
//             <div className={styles.FooterText}>Massage</div>
//             <div className={styles.FooterText}>Spray Tan</div>
//             <div className={styles.FooterText}>Waxing</div>
//             <div className={styles.FooterText}>Kosmetik</div>
//             <div className={styles.FooterText}>Wimpern</div>
//             <div className={styles.FooterText}>Haare</div>
//             <div className={styles.FooterText}>Make Up</div>
//             <div className={styles.FooterText}>Augenbrauen</div>
//             <div className={styles.FooterText}>Physiotherapie</div>
//           </div>
//         </div>
//         <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6  col-xs-6  mt-4">
//           <div className={styles.ManageFooter}>
//             <h4 className={styles.FooterHeading}>Hol dir die App</h4>
//             <div className={styles.FooterImage}>
//               <img src={"/Images/google.png"} className={styles.GoogleImageFooter} />
//             </div>
//           </div>
//         </div>
//         <div className={`col-xl-3 col-lg-3 col-md-6 col-sm-6  col-xs-6  mt-4`}>
//           <div className={styles.ManageFooter}>
//             <h4 className={styles.FooterHeading}>Newsletter</h4>
//             <div className={styles.FooterImage}>
//               <img src={"/Images/footerpic.png"} className={styles.newslterImageFooter} />
//             </div>
//             <input type="text" placeholder="Name" className={`${styles.FooterInputs} form-control`} />
//             <input type="Email" placeholder="Email" className={`${styles.FooterInputs} form-control mt-2`} />
//             <ZouluButton title="Subscribe!" className={`${styles.FooterButton} mt-2`} />
//           </div>
//         </div>
//         <center className="pb-4 mt-4">
//           <span className={styles.FooterText}>Nutzungsbedingungen | Datenschutz Zoulu, 2023. Alle Rechte vorbehalten</span>
//         </center>
//       </div>
//     </div>
//   );
// };

// export default Footer;
