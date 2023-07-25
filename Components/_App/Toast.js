import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ show, title, type, message, hide }) => {
  let hideNotif = title === "";

  if (!hideNotif && show) {
    if (title === "success") return toast.success(<Display />);
    if (title === "info") return toast.info(<Display />);
    if (title === "warning") return toast.warning(<Display />);
    if (title === "error") return toast.error(<Display />);
    setTimeout(() => {
      hide();
    }, 3000);
  }

  function Display() {
    return (
      <div>
        <span>{title}</span>
        <p className="my-1">{message}</p>
      </div>
    );
  }
  return <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />;
};

Toast.defaultProps = {
  title: "This is title",
  body: "Some body",
};

Toast.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default Toast;
