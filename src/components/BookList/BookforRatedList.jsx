import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
// import StarRating from "../StarRating/StarRating";
import axios from "axios";
import Button from "@mui/material/Button";
// import { expRating } from "../StarRating/StarRating";

// export let dataforReadList = {};
const BookforRatedlist = (book) => {
  const removeFromRatedlist = () => {
    axios
      .post("http://localhost:5000/delete_ratedbook", {
        userid: 1,
        isbn: book.bookISBN,
        // rating: expRating,
      })
      .then((response) => {
        // console.log("Status ok"); // Handle the response data
        alert("Book Removed Successfully from Ratedlist!");
        window.location.reload();
        const data = response.data;
        document.getElementById("result").innerHTML = JSON.stringify(data);
      })
      .catch((error) => {
        console.error("Post request nahi hui"); // Handle the error
      });
  };

  return (
    <div className="book-item flex flex-column flex-sb">
      <div className="book-item-img">
        <img src={book.cover_img} alt="cover" />
      </div>

      {/* This is requiredf for ML model */}
      {/* <StarRating /> */}

      <div className="book-item-info text-center">
        <Link to={`/book/${book.id}`} {...book}>
          <div className="book-item-info-item title fw-7 fs-18">
            <span>{book.title}</span>
          </div>
        </Link>

        {/* <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">ISBN: </span>
          <span>{book.bookISBN}</span>
        </div> */}

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Author: </span>
          {/* <span>{book.author.join(", ")}</span> */}
          <span>{book.author}</span>
        </div>

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">YOU RATED </span>
          <span>{book.rating} 🌟</span>
        </div>
        {/* <div className="book-item-info-item edition-count fs-15">
          <span className="text-capitalize fw-7">Publisher: </span>
          <span>{book.publisher} Publications</span>
        </div> */}

        <div>
          {/* <button onClick={removeFromRatedlist}>Remove</button> */}
          <Button
            variant="outlined"
            color="error"
            style={{ fontSize: "15px" }}
            onClick={removeFromRatedlist}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookforRatedlist;
