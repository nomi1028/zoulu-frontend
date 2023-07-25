import React from "react";
import SidebarWrapper from "./SideBarWrapper";
import TabsTable from "./customers/TabsTable";
import styles from "../../styles/customer.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chart from "./home/Chart";
import { useState } from "react";
const Index = () => {
  const [profile, setProfile] = useState();
  console.log(profile, "profile");
  return (
    <SidebarWrapper style={{ backgroundColor: "white" }}>
      <div className="container-fluid margin-sidebar">
        <div className="row pt-3">
          <div className=" col-xl-9 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pad-small-zero">
            <div className={styles.TableContainerBackground}>
              <TabsTable setProfile={(e) => setProfile(e)} />
            </div>
          </div>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pad-small-zero ">
            <div className={styles.ContactInfo}>
              <div className={styles.Profile}>
                <img src={"/Images/ellipse.png"} className={styles.CustomerPic} />
                <div className={` ${styles.CustomerName} pt-3 `}>{profile?.cartItem?.cusId?.firstName}</div>
                <div className={styles.CustomerDesignation}>UI/UX Designer</div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ContactDiv}>
                <div className={styles.ContactText}>Contact Info:</div>
                <div className="d-flex">
                  <img src={"/Images/email.png"} className={styles.IconContainer} />
                  <div className={` ${styles.CustomerDesignation}  ${styles.FontSize}`}>{profile?.cartItem?.cusId?.email}</div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ContactDiv1}>
                <div className="d-flex">
                  <img src={"/Images/vector.png"} className={styles.IconContainer} />
                  <div className={` ${styles.CustomerDesignation}  ${styles.FontSize}`}>{profile?.cartItem?.cusId?.phoneNumber}</div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ContactDiv1}>
                <div className="d-flex">
                  <img src={"/Images/location.png"} className={styles.IconContainer} />
                  <div className={` ${styles.CustomerDesignation}  ${styles.FontSize}`}>{profile?.cartItem?.address}</div>
                </div>
              </div>
            </div>
            <div className={`${styles.ContactInfo} ${styles.PerformandeCard} mt-3`}>
              <div className={styles.DisplaySpaceBeetween}>
                <div className={styles.BoldHeading}>Performance</div>
                <MoreHorizIcon />
              </div>
              <div>
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};
export default Index;
