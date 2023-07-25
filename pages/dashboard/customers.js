import React from "react";
import SidebarWrapper from "./SideBarWrapper";
import TabsTable from "./customers/TabsTable";
import styles from "../../styles/customer.module.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chart from "./home/Chart";
import { useState } from "react";
import { Avatar } from "@mui/material";
import AuthProtected from "../../utils/AuthProtected";
const Index = () => {
  const [profile, setProfile] = useState();

  return (
    <SidebarWrapper style={{ backgroundColor: "white" }}>
      <div className="container-fluid margin-sidebar">
        <div className="row pt-5 mt-5">
          <div className=" col-xl-9 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pad-small-zero">
            <div className={styles.TableContainerBackground}>
              <TabsTable setProfile={(e) => setProfile(e)} />
            </div>
          </div>
          <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 pad-small-zero ">
            <div className={styles.ContactInfo}>
              <div className={styles.Profile}>
                <Avatar src={profile?.image !== null ? profile?.image : "/Images/avatarIcon.png"} sx={{ width: 86, height: 86 }} />
                <div className={` ${styles.CustomerName} pt-3 text-capitalize`} style={{ fontFamily: "PlusJakartaSans-Medium", fontSize: "14px", fontWeight: "600" }}>
                  {profile?.name}
                </div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ContactDiv}>
                <div className={styles.ContactText}>Kontaktinformationen:</div>
                <div className="d-flex">
                  <img src={"/Images/email.png"} className={styles.IconContainer} />
                  <div className={` ${styles.CustomerDesignation}  ${styles.FontSize}`}>{profile?.email}</div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ContactDiv1}>
                <div className="d-flex">
                  <img src={"/Images/vector.png"} className={styles.IconContainer} />
                  <div className={` ${styles.CustomerDesignation}  ${styles.FontSize}`}>{profile?.phone_number}</div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ContactDiv1}>
                <div className="d-flex">
                  <img src={"/Images/location.png"} className={styles.IconContainer} />
                  <div className={` ${styles.CustomerDesignation}  ${styles.FontSize}`}>{profile?.address}</div>
                </div>
              </div>
            </div>
            <div className={`${styles.ContactInfo} ${styles.PerformandeCard} mt-3`}>
              <div className={styles.DisplaySpaceBeetween}>
                <div className={styles.BoldHeading}>Leistung</div>
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

export default AuthProtected(Index);
