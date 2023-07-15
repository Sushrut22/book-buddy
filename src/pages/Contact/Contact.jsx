import React from "react";
import "../About/About.css";
import contactImg from "../../images/contact-img.jpg";

const Contact = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="section-title">
          <h2>Contact-Info</h2>
        </div>

        <div className="about-content grid">
          <div className="about-img">
            <img src={contactImg} alt="" />
          </div>
          <div className="about-text">
            <h2 className="about-title fs-26 ls-1">About BookHub</h2>
            <h3>
              Frontend: <span>Sushrut Lachure</span>
            </h3>
            <p className="fs-17">Email: sushlachure22@gmail.com</p>
            <p className="fs-17">LinkedIn: sushrut-lachure</p>
            <h3>
              ML Chat-Bot: <span>Varshil Kavathiya</span>
            </h3>
            <p className="fs-17">Email: sushlachure22@gmail.com</p>
            <p className="fs-17">LinkedIn: varshil-kavathiya</p>
            <h3>
              Backend & ML Recommender: <span>Atharv Patil</span>
            </h3>
            <p className="fs-17">Email: sushlachure22@gmail.com</p>
            <p className="fs-17">LinkedIn: atharv-patil</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
