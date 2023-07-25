import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Api } from "../../utils/Api";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/Home.module.css";
import style from "../../styles/treatment.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader";
function ChangePassword(props) {
  const [password, setPassword] = useState();
  const [newpassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const handleClose = () => props.setShow(false);
  const onSubmit = async () => {
    if (!newpassword) {
      return toast.warning("Enter new password");
    } else if (!confirmPassword) {
      return toast.warning("Enter Confirm password");
    } else if (newpassword == confirmPassword) {
      const payload = new FormData();
      payload.append("newpassword", newpassword);
      payload.append("password", password);
      const response = await Api("Put", `api/password/${props?.userId}`, payload);
      if (response.status === 200) {
        toast.success(response.data.msg);
        handleClose();
        setNewPassword();
      } else {
        toast.error(response.data.msg);
        setNewPassword();
      }
    } else {
      return toast.warning("Confirm password and new password not matched ");
    }
  };
  return (
    <div>
      {loading ? <Loader /> : null}
      <Modal show={props?.show} onHide={handleClose} animation={false} size="lg" centered>
        <div className={style.ModalHeaderDivParent}>
          <Modal.Header closeButton className={style.ModalHeaderDiv}></Modal.Header>
        </div>
        <Modal.Body className={style.ModayBody}>
          <div>
            <div className={` row mt-5  m-0 p-0`}>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                <div className={styles.ModelForm}>
                  <input
                    type="password"
                    placeholder="Altes Passowrd"
                    className={`${styles.InputFields} mt-4`}
                    style={{ backgroundColor: "transparent" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Neue Passowrd"
                    className={`${styles.InputFields} mt-4`}
                    style={{ backgroundColor: "transparent" }}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Neue Passowrd bestätigen"
                    className={`${styles.InputFields} mt-4`}
                    style={{ backgroundColor: "transparent" }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <ZouluButton title="Passwort ändern" className={styles.LoginModalBtn} onClick={() => onSubmit()} />
                  <br />
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12" style={{ textAlign: "end" }}>
                <img src={"/Images/Abstract.png"} className={style.SignUpRightPic} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderRadius: "16px", border: "none" }}></Modal.Footer>
      </Modal>
    </div>
  );
}
export default ChangePassword;
