import React from "react";
import Navbar from "../../features/shop/Navbar";

function Contact() {
  return (
    <div className="shop">
      <div className="navbar__container">
        <Navbar />
      </div>
      <div className="shop__body">
        <div className="contact">
          <div className="contact__container">
            <h1>Contact Us</h1>
            <p style={{ fontStyle: "italic" }}>
              Comments, Suggestions, Questions or any other Queries? We would be
              happy to accomodate you!
            </p>
            <div className="message">
              <div className="message__details">
                <div className="box">
                  <div className="icon">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <div className="text">
                    <h3>Address</h3>
                    <p>Burgos St. La Paz, Iloilo City Philippines 5000</p>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </div>
                  <div className="text">
                    <h3>Phone</h3>
                    <p> 320-7190 loc. 190</p>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  </div>
                  <div className="text">
                    <h3>Email</h3>
                    <p>iirgp@isatu.edu.ph</p>
                  </div>
                </div>
              </div>
              <div className="message__box">
                <h2>Send Message</h2>
                <input placeholder="Full Name" />
                <input placeholder="Email" />
                <input placeholder="Message" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
