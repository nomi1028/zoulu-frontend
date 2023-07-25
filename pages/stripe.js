import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "../utils/Api";
import styles from "../styles/Home.module.css";
import style from "../styles/treatment.module.css";
import ZouluButton from "./Common/ZouluButton/ZouluButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import jwt from "jsonwebtoken";
const Stripe = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (query && Object.keys(query).length > 0 && query?.error) {
      setLoading(false);
    }
    query && Object.keys(query).length > 0 ? (query?.error ? null : updateStripe()) : null;
  }, [query]);
  const updateStripe = async () => {
    const formData = new FormData();
    formData.append("code", query?.code);
    formData.append("id", typeof window !== "undefined" ? jwt.decode(localStorage.getItem("zolu-auth-token"))?.data?._id : null);
    const response = await Api("post", "api/admin/stripe", formData);
    if (response.status === 200 || response.status === 201) {
      toast.success(response.data.msg);
      setLoading(false);
      router.push("/dashboard/profile");
    } else {
      toast.error(response.data.msg);
    }
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <div className="row   m-0 p-0">
        {query?.error ? (
          <>
            <div className={`col-lg-12 mt-5 ${styles.CenterData}`}>
              <h2 className={`${styles.ModalHeading} mt-5`}>Connect With Stripe</h2>
              <CancelIcon className={`${style.cancelIcon} mt-5`} />
              <div className={style.CompleteText}>
                Something went wrong try again later <br />
              </div>
            </div>

            <ZouluButton
              title="Back to Profile"
              className={`${style.goBack} mt-3 `}
              onClick={() => {
                router.push("/dashboard/profile");
              }}
            />
          </>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Stripe;
