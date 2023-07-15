import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        // console.log(data);

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;
          const newBook = {
            description: description
              ? description.value
              : "No description found",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  // console.log(dataforSimilarBooks);
  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/recommendations")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <span>{book?.description}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Places (if any): </span>
              <span className="text-italic">{book?.subject_places}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Times (if any): </span>
              <span className="text-italic">{book?.subject_times}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">OpenLibary Keywords (if any): </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
        <div>
          <h2>Similar Books</h2>
        </div>

        {/* <BookforSimilarList
          key={1} // key
          id={dataforSimilarBooks[0].new_id} // OL......W
          bookISBN={dataforSimilarBooks[0].isbn} // ISBN number -> this is required for ML model
          cover_img={dataforSimilarBooks[0].img_url}
          title={dataforSimilarBooks[0].title} // Title without brackets
          author={dataforSimilarBooks[0].bookAuthor} // Author
          publisher={dataforSimilarBooks[0].publisher}
        />
        <BookforSimilarList
          key={2} // key
          id={dataforSimilarBooks[1].new_id} // OL......W
          bookISBN={dataforSimilarBooks[1].isbn} // ISBN number -> this is required for ML model
          cover_img={dataforSimilarBooks[1].img_url}
          title={dataforSimilarBooks[1].title} // Title without brackets
          author={dataforSimilarBooks[1].bookAuthor} // Author
          publisher={dataforSimilarBooks[1].publisher}
        />
        <BookforSimilarList
          key={3} // key
          id={dataforSimilarBooks[2].new_id} // OL......W
          bookISBN={dataforSimilarBooks[2].isbn} // ISBN number -> this is required for ML model
          cover_img={dataforSimilarBooks[2].img_url}
          title={dataforSimilarBooks[2].title} // Title without brackets
          author={dataforSimilarBooks[2].bookAuthor} // Author
          publisher={dataforSimilarBooks[2].publisher}
        /> */}
      </div>
    </section>
  );
};

export default BookDetails;
