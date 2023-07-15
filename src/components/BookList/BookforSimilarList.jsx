import React from "react";
import { Link } from "react-router-dom";
import "./BookList.css";
// import StarRating from "../StarRating/StarRating";
// import { expRating } from "../StarRating/StarRating";

const BookforSimilarList = (book) => {
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

        {/* <div className="book-item-info-item publish-year fs-15">
          <span className="text-capitalize fw-7">Year: </span>
          <span>{book.first_publish_year}</span>
        </div> */}
        <div>
          {/* <Button variant="outlined" color="error" onClick={removeFromReadlist}>
            Remove
          </Button> */}
        </div>
        {/* <div>
          <button onClick={postReqAddBookToReadList}>ADD TO READLIST</button>
        </div> */}
      </div>
    </div>
  );
};

export default BookforSimilarList;
