import Link from "next/link";
import React from "react";
import styles from "../../../styles/Home.module.css";
import ZouluButton from "../ZouluButton/ZouluButton";
const ReadyZouluFooter = () => {
  return (
    <>
      <div className={`${styles.DisplayDivZoulu} `}>
        <div className={`${styles.HowItWorkTextwork} pt-5`}>
          Ready To Get <span style={{ color: "#007FFF" }}> zoulu?</span>
        </div>
        <div className={`${styles.CommonPeragraph}   mt-2`}>Easy online booking. Right to your door.</div>
        <Link href="/bookNow">
          <ZouluButton
            title="Jetzt Bewerben"
            className={`${styles.ClassColor}
            mb-5`}
          />
        </Link>
      </div>
    </>
  );
};

export default ReadyZouluFooter;
