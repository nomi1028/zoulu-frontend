import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "../../../styles/dashboard.module.css";
import moment from "moment";
const RightTable = (props) => {
  const { data } = props;
  console.log("data", data);
  return (
    <TableContainer>
      <Table aria-label="simple table" sx={{ minWidth: 850 }}>
        <TableHead
          className={styles.TableHeader}
          style={{ borderRadius: "10px" }}
          sx={{ " :last-child th": { border: 0 } }}
        >
          <TableRow
            style={{
              border: "none",
              borderBottom: "none",
              borderRadius: "10px",
            }}
          >
            <TableCell className={styles.OrderTableHeading}>
              Name des Kunden
            </TableCell>
            <TableCell className={styles.OrderTableHeadingCenterDatum}>
              Datum
            </TableCell>
            <TableCell className={styles.OrderTableHeadingCenter}>
              Behandlung
            </TableCell>
            <TableCell className={styles.OrderTableHeadingCenter}>
              Betrag
            </TableCell>
            <TableCell className={styles.OrderTableHeadingRight}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => {
            return row?.products?.map((value, key) => {
              console.log(value, "value");
              return (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={`${styles.TableDataDiv} text-capitalize`}
                  >
                    {row?._doc?.user_id?.name}
                  </TableCell>
                  <TableCell className={styles.TableDataDiv}>
                    {moment(value?.date).format("MMM DD, YYYY")}

                    <span style={{ marginLeft: "5px" }}>
                      {value?.start_time}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`${styles.TableDataDivCenter} text-capitalize`}
                  >
                    {value?.service_id?.name}
                  </TableCell>
                  <TableCell className={styles.TableDataDivCenter}>
                    €{value?.charges}
                  </TableCell>
                  <TableCell>
                    <div
                      style={
                        value?.status === "pending" ||
                        value?.status === "completed"
                          ? PendingBtn
                          : value?.status === "confirmed"
                          ? ApprovedBtn
                          : CancelBtn
                      }
                      className={styles.TableRightDiv}
                    >
                      {value?.status === "completed"
                        ? "abgeschlossen"
                        : value?.status === "pending"
                        ? "Anstehend"
                        : value?.status === "confirmed"
                        ? "Bestätigt"
                        : value?.status}
                      {/* {value?.status} */}
                    </div>
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RightTable;

export const ApprovedBtn = {
  color: "rgb(48, 213, 200)",
  background: "rgba(48, 213, 200,0.2)",
  padding: "2px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
};
export const PendingBtn = {
  color: "rgb(66,124,255)",
  background: "rgba(66,124,255,0.2)",
  padding: "2px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
};
export const CancelBtn = {
  color: "rgb(246, 0, 21)",
  background: "rgba(246, 0, 21,0.2)",
  padding: "2px 0",
  width: 110,
  borderRadius: "5px",
  textTransform: "capitalize",
  fontFamily: "PlusJakartaSans-Medium",
  textAlign: "center",
};
