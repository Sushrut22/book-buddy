import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
import StarRating from "../StarRating/StarRating";
import axios from "axios";
import { expRating } from "../StarRating/StarRating";
import { Button } from "@mui/material";

const Book = (book) => {
  const postData = () => {
    axios
      .post("http://localhost:5000/insert_ratings", {
        userid: 1,
        rating: expRating,
        img_url: book.cover_img,
        isbn: book.bookISBN,
        new_id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
      })
      .then((response) => {
        // console.log("Status ok"); // Handle the response data
        alert("Book Added to Ratedlist Successfully!");

        const data = response.data;
        // Process the returned JSON data
        // Here, you can display or manipulate the data as needed
        console.log(data);
        // Update the HTML with the data
        document.getElementById("result").innerHTML = JSON.stringify(data);
      })
      .catch((error) => {
        console.error("Post request nahi hui"); // Handle the error
      });
  };

  const postReqAddBookToReadList = () => {
    axios
      .post("http://localhost:5000/add_readbook", {
        userid: 1,
        isbn: book.bookISBN,
        img_url: book.cover_img,
        new_id: book.id,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
      })
      .then((response) => {
        // console.log("Status ok"); // Handle the response data
        alert("Book Added to Readlist Successfully!");

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
      <StarRating />

      <div className="book-item-info text-center">
        <Link to={`/book/${book.id}`} {...book}>
          <div className="book-item-info-item title fw-7 fs-18">
            <span>{book.title}</span>
          </div>
        </Link>

        {/* <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">bookId: </span>
          <span>{book.id}</span>
        </div> */}

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">ISBN: </span>
          {/* <span>{book.author.join(", ")}</span> */}
          <span>{book.bookISBN}</span>
        </div>

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Author: </span>
          {/* <span>{book.author.join(", ")}</span> */}
          <span>{book.author}</span>
        </div>

        <div className="book-item-info-item edition-count fs-15">
          <span className="text-capitalize fw-7">Publisher: </span>
          <span>{book.publisher} Publications</span>
        </div>

        <div className="book-item-info-item publish-year fs-15">
          <span className="text-capitalize fw-7">Year: </span>
          <span>{book.first_publish_year}</span>
        </div>
        <div>
          {/* <button onClick={postData}>Rate it!</button> */}
          <Button
            color="secondary"
            variant="outlined"
            size="large"
            style={{ fontSize: "15px" }}
            onClick={postData}
          >
            ⭐RATE IT!⭐
          </Button>
        </div>
        <div>
          {/* <button onClick={postReqAddBookToReadList}>ADD TO READLIST</button> */}
          <Button
            color="secondary"
            variant="outlined"
            size="large"
            style={{ fontSize: "11.5px" }}
            onClick={postReqAddBookToReadList}
          >
            ADD TO READLIST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Book;
