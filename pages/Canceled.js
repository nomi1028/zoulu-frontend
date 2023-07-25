import React, { useEffect, useState } from "react";
import ThanksModal from "./treatment/ThanksModal";
import styles from "../styles/Home.module.css";
import style from "../styles/treatment.module.css";
import DoneIcon from "@mui/icons-material/Done";
import ZouluButton from "./Common/ZouluButton/ZouluButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { Api } from "../utils/Api";
import { useRouter } from "next/router";

const Canceled = () => {
  const { query } = useRouter();
  const router = useRouter();

  useEffect(() => {
    // onSubmit();
  }, [query]);
  const onSubmit = async () => {
    const payload = new FormData();
    payload.append("booking_id", query?.booking_id);
    payload.append("session_id", query?.session_id);

    const response = await Api(
      "post",
      `api/customer/success_checkOut`,
      payload
    );
    if (response?.status === 200) {
      alert("success");
    }
  };

  return (
    <div className="row   m-0 p-0">
      <div className={`col-lg-12 mt-5 ${styles.CenterData}`}>
        <h2 className={`${styles.ModalHeading} mt-4`}>Booking Canceled</h2>
        <CancelIcon className={style.cancelIcon} />

        <div className={style.CompleteText}>
          Your Booking process is Failed <br />
        </div>
      </div>

      <ZouluButton
        title="Back to Booking"
        className={`${style.goBack} mt-3 `}
        onClick={() => {
          router.push("/bookNow");
          // props.setSignUpSecond(true);
          // props.setShow(false);
        }}
      />
    </div>
  );
};

export default Canceled;
