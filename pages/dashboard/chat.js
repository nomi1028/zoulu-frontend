import React from "react";
import styles from "../../styles/chat.module.css";
import style from "../../styles/dashboard.module.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SidebarWrapper from "./SideBarWrapper";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
const Chat = () => {
  return (
    <SidebarWrapper>
      <div className="container-fluid margin-sidebar">
        <div className="row">
          <div className={styles.ChatHeading}>Chat</div>
          <div className="col-xl-4 col-lg-12 ">
            <div className={`${style.DashboardCard} ${styles.ChatLeftCard}`}>
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonName}>Lindsey Stroud</div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              {/* Second */}
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonNameUnactive}>
                        Lindsey Stroud
                      </div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>

              {/* third */}
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonNameUnactive}>
                        Lindsey Stroud
                      </div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              {/* 4th */}
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonNameUnactive}>
                        Lindsey Stroud
                      </div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              {/* 5th */}
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonNameUnactive}>
                        Lindsey Stroud
                      </div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              {/* 6th */}
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonNameUnactive}>
                        Lindsey Stroud
                      </div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              {/* 7th */}
              <div className={` ${styles.ChatLeftPadding} `}>
                <div className={styles.DisplaSpace}>
                  <div className={styles.WidthLeft}>
                    <img
                      src={"/Images/chatimage.png"}
                      className={styles.ProfileLeftImage}
                    />
                  </div>
                  <div className={styles.WidthRight}>
                    <div className={styles.DisplaSpace}>
                      <div className={styles.PersonNameUnactive}>
                        Lindsey Stroud
                      </div>
                      <div className={styles.ChatDate}>12 aug 2022, 12:34</div>
                    </div>
                    <div className={`${styles.DisplaSpace} mt-1`}>
                      <div className={styles.LastMessage}>
                        Your idea for this application is nice!{" "}
                      </div>
                      <div className={styles.NotificationDiv}>2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-12">
            <div className={styles.ChatCard}>
              <div className={`${styles.ChatHeader} ${styles.DisplaSpace} `}>
                <div className="d-flex">
                  <div className={styles.SetPosition}>
                    <img
                      src={"/Images/chatpic.png"}
                      className={styles.ProfilePicture}
                    />
                    <div className={styles.ActiveDiv}></div>
                  </div>
                  <div className={styles.ChatPersonName}>
                    Lindsey Stroud
                    <div className={styles.ActiveStatus}>Active Now</div>
                  </div>
                </div>
              </div>
              <div className={styles.Devider}></div>
              <div className={styles.ChatScroller}>
                <div className={`${styles.MessageWholePadding} d-flex mt-5`}>
                  <img
                    src={"/Images/chatpic.png"}
                    className={styles.ProfilePicture}
                  />

                  <div className={styles.SetPosition}>
                    <div className={styles.MessageDiv}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nibh mauris cursus mattis molestie.{" "}
                    </div>
                    <PlayArrowIcon className={styles.PlayArrow} />
                  </div>
                  <div className={styles.MessageTime}>03:15 PM</div>
                </div>

                <div
                  className={`${styles.MessageWholePadding} ${styles.Revese} d-flex mt-5`}
                >
                  <img
                    src={"/Images/chatpic.png"}
                    className={styles.ProfilePicture}
                  />

                  <div className={styles.SetPosition}>
                    <div className={styles.RightMessageDiv}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nibh mauris cursus mattis molestie.{" "}
                    </div>
                    <PlayArrowIcon className={styles.PlayArrowRight} />
                  </div>
                  <div className={styles.MessageTime}>03:15 PM</div>
                </div>

                <div className={`${styles.MessageWholePadding} d-flex mt-5`}>
                  <img
                    src={"/Images/chatpic.png"}
                    className={styles.ProfilePicture}
                  />

                  <div className={styles.SetPosition}>
                    <div className={styles.MessageDiv}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nibh mauris cursus mattis molestie.{" "}
                    </div>
                    <PlayArrowIcon className={styles.PlayArrow} />
                  </div>
                  <div className={styles.MessageTime}>03:15 PM</div>
                </div>

                <div
                  className={`${styles.MessageWholePadding} ${styles.Revese} d-flex mt-5`}
                >
                  <img
                    src={"/Images/chatpic.png"}
                    className={styles.ProfilePicture}
                  />
                  {/*  */}
                  {/* </div> */}
                  <div className={styles.SetPosition}>
                    <div className={styles.RightMessageDiv}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nibh mauris cursus mattis molestie.{" "}
                    </div>
                    <PlayArrowIcon className={styles.PlayArrowRight} />
                  </div>
                  <div className={styles.MessageTime}>03:15 PM</div>
                </div>

                <div className={`${styles.MessageWholePadding} d-flex mt-5`}>
                  <img
                    src={"/Images/chatpic.png"}
                    className={styles.ProfilePicture}
                  />
                  {/*  */}
                  {/* </div> */}
                  <div className={styles.SetPosition}>
                    <div className={styles.MessageDiv}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nibh mauris cursus mattis molestie.{" "}
                    </div>
                    <PlayArrowIcon className={styles.PlayArrow} />
                  </div>
                  <div className={styles.MessageTime}>03:15 PM</div>
                </div>

                <div
                  className={`${styles.MessageWholePadding} ${styles.Revese} d-flex mt-5`}
                >
                  <img
                    src={"/Images/chatpic.png"}
                    className={styles.ProfilePicture}
                  />
                  {/*  */}
                  {/* </div> */}
                  <div className={styles.SetPosition}>
                    <div className={styles.RightMessageDiv}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Nibh mauris cursus mattis molestie.{" "}
                    </div>
                    <PlayArrowIcon className={styles.PlayArrowRight} />
                  </div>
                  <div className={styles.MessageTime}>03:15 PM</div>
                </div>
              </div>
              <div className={`${styles.DisplaSpace}  ${styles.BorderTop}`}>
                <div className={styles.MessageInput}>
                  <TextField
                    className={styles.DashSearch}
                    id="standard-search"
                    label="Type Message....."
                    type="search"
                    variant="standard"
                  />
                </div>
                <div
                  className={`${styles.DisplaSpace}  ${styles.WidthSendDiv}`}
                >
                  <RemoveIcon className={styles.RutateRemove} />
                  <AttachFileIcon className={styles.ColorSend} />
                  <SentimentSatisfiedAltIcon className={styles.ColorSend} />
                  <Button
                    className={styles.SendButton}
                    variant="contained"
                    endIcon={<SendIcon className={styles.RutateSend} />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Chat;
