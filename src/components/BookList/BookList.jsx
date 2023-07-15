import React from "react";
import { useGlobalContext } from "../../context.";
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
// import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
// import { kitab } from "../../data/defaultData";
import { kitab2 } from "../../data/newDefaultData";
  

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const { loading } = useGlobalContext();
  // books was inside
  // const booksWithCovers = books.map((singleBook) => {
  //   return {
  //     ...singleBook,
  //     // removing /works/ to get only id
  //     id: singleBook.id.replace("/works/", ""),
  //     cover_img: singleBook.cover_id
  //       ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg`
  //       : coverImg,
  //   };
  // });

  if (loading) return <Loading />;
  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          {/* <h2>{resultTitle}</h2> */}
          <h2>Here is your Plethora of Books</h2>
        </div>
        <div className="booklist-content grid">
          {/* {booksWithCovers.slice(0, 28).map((item, index) => {
            return <Book key={index} {...item} />;
          })} */}

          {kitab2.slice(0, 600).map((item, index) => {
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

export default BookList;
