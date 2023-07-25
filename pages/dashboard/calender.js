import React from "react";
import SidebarWrapper from "./SideBarWrapper";
import styles from "../../styles/calender.module.css";
import SchedularCalendar from "./calender/SchedularCalendar";
import Calendar from "./home/Calender";
import AuthProtected from "../../utils/AuthProtected";
const Index = () => {
  return (
    <SidebarWrapper>
      <div className="pt-5">
        <div className={`${styles.CardCntainer} container-fluid margin-sidebar mt-5 pt-5`}>
          <div className="" style={{ display: "flex", flexWrap: "wrap", width: "102%", marginInlineStart: "-1%" }}>
            <div className="calender-left">
              <div className={`${styles.CardCntainer} ${styles.CategoryPadding}`}>
                <div className={styles.CategoryHeading}>Kategorien</div>
                {/* <div className={`${styles.CategoriesContainer} ${styles.Categoriesbg1}  `}>Verfügbarkeit</div> */}
                <div className={`${styles.CategoriesContainer} ${styles.Categoriesbg2}  `}>Anstehende Buchungen</div>
                <div className={`${styles.CategoriesContainer} ${styles.Categoriesbg3}  `}>Letzte buchungen</div>
              </div>
            </div>
            <div className="calender-right">
              <SchedularCalendar />
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default AuthProtected(Index);
