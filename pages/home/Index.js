import React from "react";
import ZouluButton from "../../pages/Common/ZouluButton/ZouluButton";
import Faq from "./Components/Faq";
import Footer from "../Common/Footer/Footer";
import Slider from "./Components/slider/Slider";
const Home = () => {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row booking-div m-0 p-0">
        <div className="col-lg-6  ">
          <div className="padding-left">
            <div className="main-text">In Home Massage,</div>
            <div className="common-peragraph mt-4">Self-care, your way. Book same day or in advance. Australia wide, 7 days, 6am-11pm.</div>
            <div className="common-class">
              <ZouluButton title="Book Now " />
              <ZouluButton title="Become Zoulu Pro " className="border-Button" />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <img src={"/Images/sliderImage1.png"} className="right-pic" />
        </div>
      </div>
      <div className="display-div m-0 p-0">
        <div className="how-it-work-text">
          How It <span style={{ color: "#30D5C8" }}>Works</span>
        </div>
        <div className="common-peragraph mt-4">No travel, no wait times, no phone calls, just Blys.</div>

        <ZouluButton title="Book Now" className="ColoredButton mt-3" />
      </div>
      <div className="cards-div mt-5 m-0 p-0">
        <div className="container">
          <div className="row ">
            <div className="col-lg-4">
              <div className="card ">
                <div className="card-padding-div">
                  <div className="card-heading mt-4">Pick A Treatment</div>
                  <div className="common-peragraph mt-4">15+ styles of massage, plus at-home beauty, physiotherapy and osteopathy</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="active-card">
                <div className="card-padding-div">
                  <div className="card-heading mt-4">Choose your therapist</div>
                  <div className="common-peragraph mt-4">Browse profiles of qualified, insured and pre-vetted pros vbvf</div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card ">
                <div className="card-padding-div">
                  <div className="card-heading mt-4">Set a time and place</div>
                  <div className="common-peragraph mt-4">Anywhere in the city, any day, 7am-11pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5"></div>
      </div>
      <div className="d-flex mb-5">
        <Slider />
      </div>
      <div className="blue-card-div m-0 p-0">
        <div className="blue-card-head mt-5">Are You Message, Beauty Or Wellness Provider!</div>
        <div className="blue-card-text mt-4">join zoulu today’s, germany largest network of indepent mobile message, beauty and wellness providers.</div>
        <ZouluButton title="Sign up " className="work-book-btn mt-3 mb-5" />
      </div>
      <div className="row booking-div m-0 p-0">
        <div className="col-lg-6">
          <div className="questions-padding">
            <div className="main-text">Frequently Asked Questions</div>
            <div className="common-peragraph mt-4">You can book massages 7 days a week from 6 am to 11 pm, including public holidays.</div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-5">
            <Faq />
          </div>
        </div>
      </div>
      <div className="row m-0 p-0">
        <div className="col-lg-6  ">
          <div className="padding-left-phone">
            <div className="main-text">
              <span style={{ color: "#30D5C8" }}>zoulu </span>Mobile App
            </div>
            <div className="common-peragraph mt-4">Book your next Blys session on the go with the Blys mobile app</div>
          </div>
        </div>
        <div className="col-lg-6"></div>
      </div>
      <div className="display-div-ready m-0 p-0">
        <div className="how-it-work-text">
          Ready To Get <span style={{ color: "#30D5C8" }}> zoulu?</span>
        </div>
        <div className="common-peragraph mt-4">Easy online booking. Right to your door.</div>
        <ZouluButton title="Book Now" className="work-book-btn mt-3" />
      </div>
      <div className="color-div mt-5 m-0 p-0">
        <div className="container color-div">
          <div className="row  ">
            <div className="col-lg-3 col-md-3">
              <div className="d-flex mt-4">
                <div className="ml-3">
                  <h2 className="head-location">Company Address</h2>
                  <div className="addres-text">4061 oceanside blvd, unit E, oceanside, ca 92056</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="d-flex mt-4">
                <div className="ml-3">
                  <h2 className="head-location">Call Us:</h2>
                  <span className="addres-text">(960) 295-6548</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="d-flex mt-4">
                <div className="ml-3">
                  <h2 className="head-location">Email Us:</h2>
                  <span className="addres-text">milanjack39@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="display-div-ready m-0 p-0">
        <Footer />
      </div>
    </div>
  );
};
export default Home;
