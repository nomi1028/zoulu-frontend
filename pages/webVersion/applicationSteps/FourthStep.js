import React, { useEffect, useState } from "react";
import styles from "../../../styles/webversionmodals.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "@mui/material";
import { Api } from "../../../utils/Api";
const FourthStep = (props) => {
  const { serviceIds } = props;
  const [uploadfile, setUploadFile] = useState([]);
  const [values, setValues] = useState([{ name: "", desc: "", image: null }]);
  const [categories, setCategories] = useState([]);
  const filehandler = (event, id) => {
    const Data = values.filter((item, index) => {
      if (item?.id !== id && item?.id !== undefined) {
        return item;
      }
    });
    const newData = [...Data, { image: event.target.files[0], imageName: URL.createObjectURL(event.target.files[0]), id: id }];
    setValues(newData);
    setUploadFile([...uploadfile, event.target.files[0]]);
    props?.setFile(newData);
  };
  useEffect(() => {
    getServices();
  }, []);
  const getServices = async () => {
    const response = await Api("get", `api/category`);
    if (response.status === 200) {
      const data = response.data.data;
      let arr = [];
      for (const obj of data) {
        for (const id of serviceIds) {
          if (obj?._id === id) {
            arr.push(obj);
          }
        }
      }
      setCategories(arr);
    } else {
    }
  };
  console.log(values);
  return (
    <div>
      <div className={styles.ContactText}>Qualifications</div>
      <div className={styles.CategoryText}>Select the treatments you would like to offer on the serect spa platfrom </div>
      {categories?.map((data, index) => (
        <>
          <div className="d-flex mt-4 pt-3" key={data}>
            <div>
              <Button className={`${styles.UploadButtonDeep}`} variant="contained">
                {data?.name}
              </Button>
            </div>
            <div>
              <label for={index} startIcon={<AiOutlineCloudUpload className={styles.AiOutlineCloudUploadIcon} />} className={styles.UploadButton} style={{ cursor: "pointer" }} variant="contained">
                Upload Certifcate
              </label>
              <input type="file" name="upload" id={index} onChange={(e) => filehandler(e, data?._id)} style={{ display: "none" }} />
            </div>
          </div>
          {values[index]?.imageName && <object data={values[index]?.imageName} style={{ width: "125px", height: "125px" }} onClick={() => window.open(values[index]?.imageName, "blank")} />}
        </>
      ))}
    </div>
  );
};
export default FourthStep;
