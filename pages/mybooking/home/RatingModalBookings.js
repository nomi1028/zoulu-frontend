import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../../styles/ratingBooking.module.css";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useState } from "react";
import { Api } from "../../../utils/Api";
import moment from "moment";
import { Avatar } from "@mui/material";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
function RatingModalBookings(props) {
  const handleClose = () => props.setShow(false);
  const Progress = [
    { text: "5", value: "100" },
    { text: "4", value: "70" },
    { text: "3", value: "50" },
    { text: "2", value: "30" },
    { text: "1", value: "15" },
  ];
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    getbooking(1);
  }, []);
  const getbooking = async (page) => {
    const response = await Api(
      "get",
      `api/expert/booking/${props?.userid}?type="past"&page=${page}&limit=10`
    );
    if (response.status === 200) {
      setBookings(response?.data?.data);
    } else {
    }
  };
  const ratingHandler = () => {
    var rating = 0;
    var length = 0;
    var avrgRating;

    bookings?.map((value, key) => {
      if (value?.product?.status === "confirmed") {
        length = length + 1;
        rating = rating + value?.product?.rating;
      }
    });

    avrgRating = rating / length;
    return avrgRating;
    // return avrgRating.toLocaleString("de-DE", {
    //   minimumFractionDigits: 1,
    //   maximumFractionDigits: 1,
    // });
  };
  //   let formattedRating = ratingHandler.toLocaleString('de-DE', {
  //     minimumFractionDigits: 1,
  //     maximumFractionDigits: 1
  // }).replace('.', ',');
  const ReviewsPerson = () => {
    var rating = 0;
    var length = 0;
    var avrgRating;

    bookings?.map((value, key) => {
      if (value?.product?.status === "confirmed") {
        length = length + 1;
        rating = rating + value?.product?.rating;
      }
    });

    avrgRating = rating / length;

    return length || 0;
  };
  // const progressHandler = (text) => {
  //   var rating = 0;
  //   var length = 0;
  //   bookings?.map((item) => {
  //     item?.products?.map((product, key) => {
  //       if (product?.status === "confirmed") {
  //         length = length + 1;
  //         if (Math.round(product?.rating) == text) {
  //           rating = rating + 1;
  //         }
  //       }
  //     });
  //   });
  //   return (rating / length) * 100;
  // };
  const progressHandler = (text) => {
    var rating = 0;
    var length = 0;

    bookings?.map((value, key) => {
      if (value?.product?.status === "confirmed") {
        length = length + 1;

        if (Math.round(value?.product?.rating) == text) {
          rating = rating + 1;
        }
      }
    });

    return (rating / length) * 100;
  };
  return (
    <>
      <Modal
        centered
        show={props?.show}
        onHide={handleClose}
        animation={false}
        size="lg"
        className={`${styles.AdressModalHeight}`}
      >
        <Modal.Header
          closeButton
          className={`${styles.ModalHead}  ${styles.AddressModallClass}`}
        >
          <Modal.Title className={styles.modalHeading}></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.AllreviewContainer}>
            <div className={styles.allreviewText}>Alle Bewertungen</div>
            <div className={styles.ratingsreviews}>Kundenbewertungen</div>
            <div className="mt-4">
              <div className={styles.flexCenterMain}>
                <div>
                  {Progress.map((item, index) => (
                    <div className="d-flex mt-2" key={index}>
                      <div className={styles.progressBarTitle}>{item.text}</div>
                      <Box sx={{ flexGrow: 1 }}>
                        <BorderLinearProgress
                          className={styles.progressbar}
                          variant="determinate"
                          value={progressHandler(item.text) || 0}
                        />
                      </Box>
                    </div>
                  ))}
                </div>
                <div>
                  <div className={`${styles.ratingCount} mt-2 pt-2`}>
                    {Math.round(ratingHandler())}
                  </div>
                  <div className={styles.ratingCenter}>
                    <Stack
                      spacing={1}
                      className="stackRating-RatingModals  mt-3"
                      style={{ width: "155px" }}
                    >
                      <Rating
                        readOnly
                        name="half-rating"
                        defaultValue={ratingHandler()}
                        precision={0.5}
                        style={{ color: "#ffffff" }}
                      />
                    </Stack>
                  </div>
                  <div className={`${styles.basedReviewTitle} mt-2`}>
                    Basierend auf {ReviewsPerson()} Bewertungen
                  </div>
                </div>
              </div>
            </div>
          </div>
          {bookings?.map((item, index) => {
            return item?.products?.map((product, key) => {
              if (product?.status === "confirmed") {
                return (
                  <div className={`${styles.commentBox} mt-5`} key={index}>
                    <div className="d-flex">
                      <div>
                        {" "}
                        <Avatar
                          src={item?.user_id?.image}
                          className={styles.imageCommentBox}
                        />
                      </div>
                      <div className={`${styles.CommentProfileName} mt-2 pt-1`}>
                        {item.user_id?.name}
                      </div>
                    </div>
                    <div
                      className={`${styles.flexCenterRatingComment}  mt-2 pt-1`}
                    >
                      <div className="d-flex">
                        <div>
                          <Stack
                            spacing={1}
                            className="Sub-stackRating"
                            style={{ width: "130px" }}
                          >
                            <Rating
                              value={Math.round(product?.rating)}
                              readOnly
                              name="size-small"
                              precision={0.5}
                              size="small"
                              style={{ color: "#ffffff" }}
                            />
                          </Stack>
                        </div>
                      </div>
                      <div className={styles.verifiedText}>
                        {/* {item.verfiedText} */}
                      </div>
                    </div>
                    <div className={`${styles.commentDate} mt-2 pt-1`}>
                      {moment(product?.date).format("MMMDD, YYYY")}
                    </div>
                    {product?.reviews !== null && (
                      <div className={`${styles.commenttext} mt-2 pt-1`}>
                        {product?.reviews}
                      </div>
                    )}
                    <div className={`${styles.dividercomment} mt-3`}></div>
                    <div className={`${styles.flexcenterThumbsbtn} mt-1`}>
                      <div className={`${styles.helpfulText} mt-3`}>
                        {/* {item.helpfullText} */}
                      </div>
                    </div>
                  </div>
                );
              }
            });
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default RatingModalBookings;
