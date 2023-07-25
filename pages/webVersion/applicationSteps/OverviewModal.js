import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../../Common/ZouluButton/ZouluButton";
import styles from "../../../styles/webversionmodals.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import DoneIcon from "@mui/icons-material/Done";
import style from "../../../styles/booknow.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";
function Overview(props) {
  console.log(props?.questions, "props?.questions");
  const handleClose = () => {
    props.setShow(false);
  };
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    setUser(jwt.decode(window.localStorage.getItem("zolu-auth-token-expert")));
  }, []);
  const handlerChange = async () => {
    if (props?.questions.length !== 0 || props?.treatments !== 0) {
      const payload = new FormData();
      payload.append("phoneNumber", props?.edit?.phoneNumber);
      payload.append("firstName", props?.edit?.firstName);
      payload.append("profileComplete", true);
      payload.append("qualification", "matric");
      payload.append("address", props?.questions[1]?.answer);
      payload.append("id", props?.edit?._id);
      payload.append("questions", JSON.stringify(props?.questions));
      for (let i = 0; i < props?.file.length; i++) {
        payload.append("file", props?.file[i]?.image);
      }
      payload.append("role", "expert");
      payload.append("treatments", JSON.stringify(props?.treatments));
      fetch(`/api/customer/editProfile`, {
        method: "POST",
        body: payload,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("zolu-auth-token-expert", data?.token);
          localStorage.setItem("zolu-auth-token", data?.token);
          props.setApplicationComplete(true);
          handleClose();
          localStorage.clear();
          toast.success(data?.message);
        });
    } else {
      alert("error");
    }
  };
  return (
    <>
      <Modal show={props.show} centered onHide={handleClose} animation={false} size="lg">
        <Modal.Header className={styles.ModalHeaderDiv} style={{ borderTopRightRadius: "17px", borderTopLeftRadius: "17px" }}>
          <div className={styles.leftApplicationHeader} style={{ width: "90%", margin: "auto" }}>
            <div className={styles.ModalHeaderText}>Your Application</div>
            <div className={styles.ModalHeaderLevel}>
              step 4/<span style={{ color: "rgb(233, 233, 233)" }}>4</span>
            </div>
            <LinearProgress variant="determinate" value={progress} className={styles.ProgressBar} />
          </div>
        </Modal.Header>
        <Modal.Body className={`  ${styles.leftApplicationbody}`}>
          <div className={`${styles.AppplicationContainer} mt-5  m-0 p-0`}>
            <div className={styles.ContactText}>Overview</div>
            <div className={styles.CategoryText}>Select the treatments you would like to offer on the serect spa platfrom</div>
            <div className="row">
              <div className="col-lg-12 mt-3">
                <div className={`${styles.SelecteddivOverview} d-flex justify-space-between`}>
                  <div className={style.TimeText}>
                    <DoneIcon className={styles.OverviewDoneIcon} />
                    <span className={`${styles.OptionText} ml-5`}> Contact Information</span>
                  </div>
                  <div className={styles.DownIcon}>
                    <div className={styles.EditText}>Edit</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className={`${styles.SelecteddivOverview} d-flex justify-space-between`}>
                  <div className={style.TimeText}>
                    <DoneIcon className={styles.OverviewDoneIcon} />
                    <span className={`${styles.OptionText} ml-5`}> About Us</span>
                  </div>
                  <div className={styles.DownIcon}>
                    <div className={styles.EditText} onClick={(e) => props?.setProgress(50) || handleClose() || props?.setShowApplicationModal(true)}>
                      Edit
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className={`${styles.SelecteddivOverview} d-flex justify-space-between`}>
                  <div className={style.TimeText}>
                    <DoneIcon className={styles.OverviewDoneIcon} />
                    <span className={`${styles.OptionText} ml-5`}> Treatments</span>
                  </div>
                  <div className={styles.DownIcon}>
                    <div
                      className={styles.EditText}
                      onClick={(e) => {
                        props?.setProgress(75);
                        props?.setShowApplicationModal(true);
                        handleClose();
                      }}
                    >
                      Edit
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className={`${styles.SelecteddivOverview} d-flex justify-space-between`}>
                  <div className={style.TimeText}>
                    <DoneIcon className={styles.OverviewDoneIcon} />
                    <span className={`${styles.OptionText} ml-5`}> Qualifications</span>
                  </div>
                  <div className={styles.DownIcon}>
                    <div className={styles.EditText} onClick={(e) => props?.setProgress(100) || handleClose() || props?.setShowApplicationModal(true)}>
                      Edit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          className={styles.ModalFooter}
          style={{
            borderTop: "none",
            backgroundColor: "white",
            borderBottomRightRadius: "17px",
            borderBottomLeftRadius: "17px",
          }}
        >
          <ZouluButton title="Continue" className={styles.ApplicationButton} onClick={() => handlerChange()} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Overview;
