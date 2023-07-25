import React from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/calender.module.css";
import SchedularCalendar from "./calender/SchedularCalendar";
import Calendar from "./home/Calender";
const Index = () => {
  return (
    <SidebarWrapper>
      <div className={`${styles.CardCntainer} container-fluid margin-sidebar`}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "102%",
            marginInlineStart: "-1%",
          }}
        >
          <div className="calender-left">
            <Calendar className="hide-bord" />
            <div
              className={`${styles.CardCntainer} ${styles.CategoryPadding} `}
            >
              <div className={styles.CategoryHeading}>Categories</div>
              <div
                className={`${styles.CategoriesContainer} ${styles.Categoriesbg1}  `}
              >
                Avaibility
              </div>
              <div
                className={`${styles.CategoriesContainer} ${styles.Categoriesbg2}  `}
              >
                Pending Bookings
              </div>
              <div
                className={`${styles.CategoriesContainer} ${styles.Categoriesbg3}  `}
              >
                Past Bookings
              </div>
            </div>
          </div>
          <div className="calender-right">
            <SchedularCalendar />
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};
export default Index;
