import React from "react";
import ZouluButton from "../ZouluButton/ZouluButton";
// import ZouluButton from "../../Common/ZouluButton/ZouluButton";
// import styles from "../../styles/Home.module.css";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
const ContactUsFooter = () => {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <div className="col-lg-6  contactViewFooter">
          <h2 className="contactViewHeading">Trete Nun Zoulu Bei!</h2>
          <h5 className="contactViewDetail">
            Sei dein eigener Chef und verdiene mehr Geld nach <br /> <div className="mt-2">deinem eigenen Zeitplan</div>
          </h5>
          <div>
            <Link href="">
              <ZouluButton title={"Jetzt Buchen"} className={`${styles.AddressButtonbook} mt-3 mb-3`} />
            </Link>
          </div>
        </div>
        <div className="col-lg-6  contactViewRight" style={{ backgroundColor: "#FAFAFA" }}>
          {" "}
          <h2 className="contactViewHeadingRight">Kontaktiere uns</h2>
          {/* <div className="contactviewDetail">
            <div>
              <img style={{ height: "24px", width: "21px", marginLeft: "-2px" }} src="/images/locationicon.png"></img>
            </div>
            <div style={{ margin: "10px" }}>
              <div className="contactAdressTitile">Company Address</div>
              <div className="contactAdress">4061 oceanside blvd, unit e, oceanside, ca. 92056</div>
            </div>
          </div> */}
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
            <div
              className="contactviewDetail "
              //   style={{ paddingRight: "170px" }}
            >
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
  );
};
export default ContactUsFooter;

// import React from "react";
// import styles from "../../../styles/Home.module.css";

// const ContactUsFooter = () => {
//   return (
//     <>
//       <div className={`${styles.ColorDiv} `}>
//         <div className={`${styles.PaddingHomeScreen} `}>
//           <div className={`row ${styles.BlueCardAddress}`}>
//             <div className="col-lg-5  col-md-4  col-sm-4  col-xs-12 col-12">
//               <div className="d-flex mt-4">
//                 <div>
//                   <img src={"/Images/locationicon.png"} className={` ${styles.ContactSize} mr-3`} />
//                 </div>
//                 <div className={styles.MarginContact}>
//                   <h2 className={styles.HeadLocation}>Company Address</h2>
//                   <div className={styles.AddresText}>4061 oceanside blvd, unit E, oceanside, ca 92056</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-3 col-md-4  col-sm-4  col-xs-12 col-12">
//               <div className="d-flex mt-4">
//                 <div>
//                   <img src={"/Images/phones.png"} className={` ${styles.ContactSizephone} mr-2`} />
//                 </div>
//                 <div className={styles.MarginContact}>
//                   <h2 className={styles.HeadLocation}>Telefon:</h2>
//                   <div className={styles.AddresText}>(960) 295-6548</div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-3 col-md-4  col-sm-4  col-xs-12 col-12">
//               <div className="d-flex mt-4">
//                 <div>
//                   <img src={"Images/emails.png"} className={` ${styles.ContactSizeEmail} mr-3`} />
//                 </div>
//                 <div className={`${styles.MarginContact} pt-0`}>
//                   <h2 className={styles.HeadLocation}>Email Us:</h2>
//                   <div className={styles.AddresText}>milan jack 39@gmail. com</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUsFooter;
