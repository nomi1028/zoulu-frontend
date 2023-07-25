import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/booknow.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import { Api } from "../../utils/Api";
function DeepTissueMassage(props) {
  const { serviceId, address } = props;
  console.log("props", props?.serviceId);
  const [durationPrice, setDurationPrice] = useState({
    price: serviceId?.service_experts[0]?.services?.price,
    duration: serviceId?.duration,
  });

  const [loader, setLoader] = useState(false);
  const handleClose = () => {
    console.log(durationPrice, "durationPrice");
    if (props?.serviceId?.options?.length !== 0) {
      props.setShow(false);
      props.setTimeModal(true);
    } else {
      props.setShow(false);
      onSubmit();
    }
  };
  const handleClosed = () => {
    props.setShow(false);
  };
  const onSubmit = async () => {
    if (props?.serviceId?.service_experts[0]?.services?.price === 0) {
      return toast.warning("There is no expert available");
    }
    var array = [];
    if (window.localStorage.getItem("zolu-cartOld") !== null) {
      var data = JSON.parse(window.localStorage.getItem("zolu-cartOld"));
      data?.array?.map((val, index) => {
        array.push(val);
      });
    }
    if (!props?.values || props?.values === "undefined") {
      setLoader(true);
      const cart = {
        address: address,
        charges: props?.serviceId?.service_experts[0]?.services?.price,
        service_id: serviceId,
        category_id: serviceId?.category_id,
        name: serviceId?.name,
        packages: [],
        duration: props?.serviceId?.service_experts[0]?.services?.duration,
      };
      array = [...array, cart];
      localStorage.setItem("zolu-cartOld-address", address);
      localStorage.setItem("zolu-cartOld", JSON.stringify({ address, array }));
      props?.setCarts(array);
      props.setShow(false);
      setDurationPrice({ price: 0, duration: 0 });
      setLoader(false);
      props?.showModal(true);
    } else {
      let cartArray = [];
      if (props.carts?.length > 0) {
        cartArray = [
          ...props?.carts,
          {
            charges: props?.serviceId?.service_experts[0]?.services?.price,
            service_id: serviceId?._id,
            name: serviceId?.name,
            packages: [],
            duration: props?.serviceId?.service_experts[0]?.services?.duration,
          },
        ];
      } else {
        cartArray.push({
          charges: props?.serviceId?.service_experts[0]?.services?.price,
          service_id: serviceId?._id,
          name: serviceId?.name,
          packages: [],
          duration: props?.serviceId?.service_experts[0]?.services?.duration,
        });
      }
      const payload = new FormData();
      payload.append("products", JSON.stringify(cartArray));
      payload.append("address", address);
      payload.append("userId", props?.values);
      setLoader(true);
      const response = await Api("post", `api/customer/cart`, payload);
      if (response.status === 200) {
        props?.setCart(response?.data?.data?.products);
        toast.success(response?.data?.msg);
        setDurationPrice({ price: 0, duration: 0 });
        props.setShow(false);
        setLoader(false);
        props?.setcartLength(response?.data?.data?.products?.length);
        props?.showModal(true);
      }
    }
  };
  return (
    <Modal show={props.show} onHide={handleClosed} animation={false} className="modalpadding" size="lg" style={{ overflow: "scroll" }}>
      <Modal.Header closeButton className={`${styles.ModalHead}  ${styles.AddressModallClass}`}>
        <Modal.Title>
          <span className={styles.ModalHeader}>{props?.serviceId?.name}</span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.DeepTissueModalBody}>
        <div style={{ minHeight: "350px", overflowY: "scroll" }}>
          <div className="row mt-4 pt-1 mb-4 m-0 p-0">
            <div>
              <div className={styles.DeepModalHeading}>Beschreibung</div>
              <span className={styles.DeepModalText}>{props?.serviceId?.description}</span>
            </div>
          </div>
          <div className="row mt-4 pt-1 mb-4 pb-3 m-0 p-0">
            <div>
              <div className={`${styles.DeepTissueModalHeading} mb-2`}>Vorbereitung</div>
              <span className={`${styles.DeepModalText} mt-3`}>{props?.serviceId?.preparations}</span>
            </div>
          </div>

          <div className="row" style={{ marginBottom: "100px" }}>
            {props?.serviceId?.steps?.map((data, index) => {
              return (
                <div className="col-lg-12" key={index}>
                  <div className={styles.DoneTextDiv}>
                    <DoneIcon className={styles.DoneIcon} />
                    <div className={`${styles.ModalDetailText} `}>{data}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modalFooterStyle">
        <ZouluButton
          title="Jetzt Buchen"
          className={`${styles.AddressButton}  mt-3 mb-4`}
          onClick={() => {
            handleClose();
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}
export default DeepTissueMassage;
