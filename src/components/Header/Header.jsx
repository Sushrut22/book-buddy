import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex flex-c text-center text-white">
          <h2 className="header-title text-capitalize">
            BookBuddy: Your Book Companion
          </h2>
          <br />
          <p className="header-text fs-18 fw-3 text-white">
            <ul>
              <li>✨ Rate your book ✨</li>
              <li>✨ Get Book Recommendations ✨</li>
              <li>✨ Share your Feedback ✨</li>
            </ul>
          </p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Header;
