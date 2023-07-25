import React, { Fragment, useEffect, useState } from "react";
import styles from "../../../styles/dashboard.module.css";
import Chart from "./Chart";
import RightTable from "./RightTable";
import { Api } from "../../../utils/Api";

import { FormControl } from "@material-ui/core";
import { MenuItem, Select } from "@mui/material";
import Pagination from "../../../Components/Pagination";
import Loader from "../../../Components/Loader";
// import ModifiedChart from "./Chart";
var jwt = require("jsonwebtoken");
const LeftSide = (props) => {
  const { dashbaordData, chart, setYear, year } = props;
  const [booking, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [dropDownValue, setDropDownValue] = useState("1");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
    getbooking(currentPage);
  }, [currentPage]);
  const getbooking = async (page) => {
    setLoading(true);
    const response = await Api(
      "get",
      `api/expert/expertCalender/${
        typeof window !== "undefined"
          ? jwt.decode(window.localStorage.getItem("zolu-auth-token"))?.data
              ?._id
          : null
      }?page=${page}&limit=10`
    );
    if (response.status === 200) {
      setLoading(false);
      setBookings(response.data.data);
      if (pages.length === 0) {
        for (let i = 1; i <= response?.data.pagination?.pages; i++) {
          pages.push(i);
        }
        setPages(pages);
      }
    } else {
      setLoading(false);
    }
  };
  const getYearsList = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear; year++) {
      years.unshift(year);
    }
    return years;
  };
  return (
    <Fragment>
      {loading ? <Loader /> : null}
      <div className="container-fluid m-0 p-0">
        <div className="pr-0">
          <div className="row mt-5 pt-3">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="total_revenue_chart">
                <div
                  className={`${styles.DashboardCard} ${styles.DashboardCardPadding} `}
                >
                  <div className={styles.DisplaySpace}>
                    <div>
                      <span className={styles.TotalText}>Gesamtumsatz</span>
                    </div>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: "120px" }}>
                        <Select
                          style={{
                            borderRadius: "10px",
                            height: "36px",
                            fontSize: "12px",
                            fontFamily: "PlusJakartaSans-Medium",
                            fontWeight: "500",
                          }}
                          value={year ? year : "Dieses Jahr"}
                          defaultValue={year ? year : "Dieses Jahr"}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem selected>{"Dieses Jahr"}</MenuItem>
                          {getYearsList()?.map((e, i) => (
                            <MenuItem
                              value={e}
                              key={i}
                              onClick={() => setYear(e === "reset" ? "" : e)}
                            >
                              {e}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/* <div className={` ${styles.GraphDropDown} dropdown`}>
                      <button
                        className={`${styles.GraphDropDownBtn} btn   dropdown-toggle`}
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {year ? year : "Dieses Jahr"}
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {getYearsList()?.map((e, i) => (
                          <span
                            className="dropdown-item text-capitalize"
                            key={i}
                            onClick={() => setYear(e === "reset" ? "" : e)}
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div> */}
                  </div>
                  <div className={`${styles.GraphRate} mt-2`}>
                    {dashbaordData?.totalRevenue?.toLocaleString()} €
                  </div>
                  <Chart chart={chart} />
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: "22px" }}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="order_detail_card">
                <div
                  style={{ marginBottom: "20px" }}
                  className={`${styles.DashboardCard} ${styles.TablePading}`}
                >
                  <div className={styles.Order}>Buchungsdetails</div>
                  <RightTable data={booking} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "6px",
                      marginBottom: "-23px",
                    }}
                  >
                    {booking?.length > 0 ? (
                      <Pagination
                        currentPage={currentPage}
                        setCurrentPage={(page) => setCurrentPage(page)}
                        pages={pages}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default LeftSide;
