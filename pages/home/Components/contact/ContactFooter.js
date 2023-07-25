import React from "react";
import ZouluButton from "../../../Common/ZouluButton/ZouluButton";
import styles from "../../../../styles/Home.module.css";
import Link from "next/link";
const ContactFooter = () => {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <div className="col-lg-6  contactViewFooter">
          <h2 className="contactViewHeading">Bereit für Zoulu?</h2>
          <h5 className="contactViewDetail">
            Jetzt online Buchen. Einfach und schnell zu dir <br /> nach Hause.
          </h5>
          <div>
            <Link href="/bookNow">
              <ZouluButton title={"Jetzt Buchen"} className={`${styles.AddressButtonbook} mt-3 mb-3`} />
            </Link>
          </div>
        </div>
        <div className="col-lg-6  contactViewRight" style={{ backgroundColor: "#FAFAFA" }}>
          {" "}
          <h2 className="contactViewHeadingRight">Kontaktiere uns:</h2>
          {/* <div className="contactviewDetail">
            <div>
              <img style={{ height: "24px", width: "21px", marginLeft: "-2px" }} src="/images/locationicon.png"></img>
            </div>
            <div style={{ margin: "10px" }}>
              <div className="contactAdressTitile">Company Address</div>
              <div className="contactAdress">4061 oceanside blvd, unit e, oceanside, ca. 92056</div>
            </div>
          </div> */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "66%" }}>
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
              className="contactviewDetail"
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
export default ContactFooter;
