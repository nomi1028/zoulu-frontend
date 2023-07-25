import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZouluButton from "../Common/ZouluButton/ZouluButton";
import styles from "../../styles/booknow.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { Api } from "../../utils/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader";
function TimeModal(props) {
  const { serviceId, address } = props;
  console.log(serviceId);
  const [duration, setDuration] = useState("");
  const [serviceObject, setServiceObject] = useState(serviceId);
  const [durationPrice, setDurationPrice] = useState({
    price: serviceId?.service_experts[0]?.services?.price,
    duration: serviceId?.duration,
  });
  const [loader, setLoader] = useState(false);
  const [charge, setCharges] = useState();
  const [selectedPackage, setSelectedPackage] = useState([]);
  const handleClose = () => {
    setDurationPrice({ price: 0, duration: 0 });
    props.setShow(false);
  };
  useEffect(() => {
    serviceObject?.options?.map((option, index) => {
      serviceObject?.packages?.map((pkg, i) => {
        if (pkg?.option_id === option?._id) {
          if (option.mandatory) {
            if (selectedPackage.length < 1) {
              const isPackageSelected = selectedPackage?.find((e) => e?.mandatory && option?._id === e?.option_id);
              if (!isPackageSelected) {
                pkg.option_id = option?._id;
                pkg.mandatory = true;
                setServiceObject({ ...serviceObject });
                selectedPackage.push(pkg);
                getPackageValue(selectedPackage);
              } else {
                pkg.option_id = option?._id;
                pkg.mandatory = true;
                setServiceObject({ ...serviceObject });
                const filter = selectedPackage?.filter((e) => e?.option_id !== option?._id);
                filter.push(pkg);
                setSelectedPackage([...filter]);
                getPackageValue(filter);
              }
            }
          }
        }
      });
    });
  }, []);
  const onSubmit = async () => {
    if (durationPrice?.price === 0) {
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
        charges: durationPrice.price,
        service_id: serviceId,
        category_id: serviceId?.category_id,
        name: serviceId?.name,
        packages: selectedPackage?.map((e) => ({ package_id: e })),
        duration: durationPrice.duration,
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
            charges: durationPrice.price,
            service_id: serviceId?._id,
            name: serviceId?.name,
            packages: selectedPackage?.map((e) => ({ package_id: e?._id })),
            duration: durationPrice.duration,
          },
        ];
      } else {
        cartArray.push({
          charges: durationPrice.price,
          service_id: serviceId?._id,
          name: serviceId?.name,
          packages: selectedPackage?.map((e) => ({ package_id: e?._id })),
          duration: durationPrice.duration,
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
  const getPackageValue = async (pkg) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("service_id", serviceId?._id);
    formData.append("packages", JSON.stringify(pkg?.map((e) => e?._id)));
    const response = await Api("post", "api/expertPackage", formData);
    if (response.status === 200) {
      console.log(response.data.lowestPrice, "response.data.lowestPrice");
      setDurationPrice({
        price: response.data.lowestPrice,
        duration: response.data.service_duration,
      });
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? <Loader /> : null}
      <Modal show={props.show} onHide={handleClose} animation={false} size="lg" centered className={`${styles.TimeModalHeight}`}>
        <Modal.Header closeButton className={`${styles.ModalHead} ${styles.ShadowClass} ${styles.TimeModalHeadClass}`}>
          <Modal.Title>
            <span className={styles.ModalHeader}>Optionen Wählen</span>
          </Modal.Title>
        </Modal.Header>
        {/* <p className={styles.DurationClass}>Optionen</p> */}
        <Modal.Body className={styles.TimeModalBodyClass} style={{}}>
          <div className="row mb-5" style={{ marginTop: "0px" }}>
            {serviceObject?.options?.map((option, index) =>
              option?.deleted ? null : (
                <div key={index}>
                  <div
                    className={`${styles.TimeText} my-3`}
                    style={{
                      marginLeft: "12px",
                      fontFamily: "PlusJakartaSans-medium",
                      textTransform: "capitalize",
                      fontSize: "16px",
                    }}
                  >
                    {option?.title}
                  </div>
                  {serviceObject?.packages?.map((pkg, i) =>
                    pkg?.option_id === option?._id ? (
                      <div
                        className="col-lg-12"
                        key={i}
                        onClick={() => {
                          if (option.mandatory) {
                            const isPackageSelected = selectedPackage?.find((e) => e?.mandatory && option?._id === e?.option_id);
                            if (!isPackageSelected) {
                              pkg.option_id = option?._id;
                              pkg.mandatory = true;
                              setServiceObject({ ...serviceObject });
                              selectedPackage.push(pkg);
                              getPackageValue(selectedPackage);
                            } else {
                              pkg.option_id = option?._id;
                              pkg.mandatory = true;
                              setServiceObject({ ...serviceObject });
                              const filter = selectedPackage?.filter((e) => e?.option_id !== option?._id);
                              filter.push(pkg);
                              setSelectedPackage([...filter]);
                              getPackageValue(filter);
                            }
                          } else {
                            const Ids = selectedPackage?.map((e) => e?._id);
                            if (!Ids.includes(pkg?._id)) {
                              pkg.option_id = option?._id;
                              setServiceObject({ ...serviceObject });
                              selectedPackage.push(pkg);
                              setSelectedPackage([...selectedPackage]);
                              getPackageValue(selectedPackage);
                            } else {
                              const filter = selectedPackage?.filter((e) => e?._id !== pkg?._id);
                              setSelectedPackage(filter);
                              getPackageValue(filter);
                            }
                          }
                        }}
                      >
                        <div className={styles.SelecteddivHardCoded} style={selectedPackage?.find((e) => e?._id === pkg?._id) ? { border: "2px solid #007FFF" } : null}>
                          <span className={styles.TimeText} style={{ textTransform: "capitalize" }}>
                            {pkg?.title}
                          </span>
                          {selectedPackage?.find((e) => e?._id === pkg?._id) ? <DoneIcon className={styles.DoneIcon} /> : <ZouluButton title="Hinzufügen" className={styles.TimeAddBtn} />}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.FooterTime}>
          <div className={styles.FooterContaoner}>
            <div className={styles.wrappe} style={{ flexWrap: "wrap" }}>
              <div className={`${styles.TimeText} my-3`}>{durationPrice?.price === 0 && "There is no expert available"}</div>{" "}
              <div className={`${styles.TimeAmount} flexSmallScreen`}>
                <div className={`${styles.FromText} marginLeft`}>Ab </div>
                <div style={{ color: "#007fff" }}>{durationPrice?.price !== 0 && ` €${durationPrice?.price}`}</div>
              </div>
              <div className={`${styles.Timetime} mt-4 pt-1 `}> {durationPrice?.duration !== undefined && durationPrice?.duration !== 0 && `${durationPrice?.duration} Min`}</div>
            </div>
            <div style={{ borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
              <ZouluButton title="Hinzufügen" className={`${styles.AddressButton1} `} onClick={() => onSubmit()} />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default TimeModal;
