import React from "react";
import { useGlobalContext } from "../../context.";
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import "../BookList/BookList.css";
import { dataAfterML } from "../../pages/Home/Home";

const RecoList = () => {
  const { loading } = useGlobalContext();

  console.log(dataAfterML);
  if (loading) return <Loading />;
  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>What others are reading...</h2>
        </div>
        <div className="booklist-content grid">
          {/* {booksWithCovers.slice(0, 28).map((item, index) => {
            return <Book key={index} {...item} />;
          })} */}
          {dataAfterML.slice(0, 100).map((item, index) => {
            return (
              <Book
                key={index} // key
                id={item.new_id} // OL......W
                bookISBN={item.ISBN} // ISBN number -> this is required for ML model
                cover_img={item.imageUrlL}
                title={item.bookTitle} // Title without brackets
                author={item.bookAuthor} // Author
                publisher={item.publisher}
                first_publish_year={item.yearOfPublication}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecoList;
