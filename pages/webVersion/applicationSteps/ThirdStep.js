import React, { useEffect, useState } from "react";
import styles from "../../../styles/webversionmodals.module.css";
import style from "../../../styles/booknow.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DoneIcon from "@mui/icons-material/Done";
import { Api } from "../../../utils/Api";
import { toast } from "react-toastify";
const ThirdStep = (props) => {
  const { serviceIds, setServiceIds } = props;
  const [showDiv, setShowDiv] = useState(false);
  const [services, setServices] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const response = await Api("get", `api/category`);
    if (response.status === 200) {
      const data = response.data.data;
      for (const obj of data) {
        for (const id of serviceIds) {
          if (obj?._id === id) {
            data.selectedService = id;
          }
        }
      }
      setCategories(data);
    } else {
      toast.error(response.data.msg);
    }
  };
  const handlerdropdown = (data) => {
    if (showDiv === data?._id) {
      setShowDiv();
    } else {
      setShowDiv(data?._id);
    }
  };
  const handleservice = (service, index) => {
    console.log(service?._id, "data?.coming");
    if (services[index]?.selectedService !== undefined) {
      console.log("exist");
      services[index].selectedService = undefined;
      setServices([...services]);
      props?.setServicesID([...services]);
    } else {
      categories.services[index].selectedService = cat?._id;
      setCategories([...categories]);
      props?.setServicesID([...categories]);
    }
  };
  return (
    <div className="pr-4">
      <div className={styles.ContactText}>Treatments</div>
      <div className={styles.CategoryText}>Select the treatments you would like to offer on the serect spa platfrom</div>
      <div className="row mt-4">
        <div className="col-lg-12">
          {categories?.map((data, key) => {
            return (
              <>
                <div className={`${styles.Selecteddiv} d-flex justify-space-between`} key={key}>
                  <div className={style.TimeText}>
                    <img src={"/Images/nailicon.png"} className={styles.MessageIcon} />
                    <span className={`${styles.OptionText} ml-5`}> {data?.name}</span>
                  </div>

                  <div className={styles.DownIcon}>
                    {data?.selectedService ? (
                      <DoneIcon
                        className={styles.TickIcon}
                        onClick={() => {
                          data.selectedService = null;
                          setCategories([...categories]);
                          setServiceIds(serviceIds?.filter((e) => e !== data?._id));
                        }}
                      />
                    ) : (
                      <span
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={() => {
                          data.selectedService = data?._id;
                          setCategories([...categories]);
                          setServiceIds([...serviceIds, data?._id]);
                        }}
                      >
                        Add
                      </span>
                    )}
                    {showDiv === data?._id ? (
                      <KeyboardArrowUpIcon onClick={() => handlerdropdown(data)} style={{ cursor: "pointer" }} />
                    ) : (
                      <KeyboardArrowDownIcon onClick={() => handlerdropdown(data)} style={{ cursor: "pointer" }} />
                    )}
                  </div>
                </div>
                {showDiv === data?._id
                  ? data?.services?.map((service, index) => (
                      <div className="row mt-3" style={{ width: "100%", marginLeft: "0.2%", marginTop: "10px" }}>
                        <div className={`${styles.HidenOptions} d-flex justify-space-between`}>
                          <div className={style.TimeText}>
                            <span className={`${styles.OptionText} ml-5 ${styles.TextSize}`}> {service?.name}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ThirdStep;
