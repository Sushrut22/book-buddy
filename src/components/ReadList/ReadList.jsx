import React from "react";
import { useGlobalContext } from "../../context.";
// import Book from "../BookList/Book";
import BookforReadlist from "../BookList/BookforReadList";
import Loading from "../Loader/Loader";
import "../BookList/BookList.css";
// import { kitab2 } from "../../data/newDefaultData";
// import { dataAfterML } from "../../pages/Home/Home";
// import axios from "axios";
import { dataforReadList } from "../../pages/Home/Home";

const ReadList = () => {
  const { loading } = useGlobalContext();

  console.log(dataforReadList);
  if (loading) return <Loading />;
  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>View your Readlist</h2>
        </div>
        <div className="booklist-content grid">
          {/* {booksWithCovers.slice(0, 28).map((item, index) => {
            return <Book key={index} {...item} />;
          })} */}

          {dataforReadList.slice(0, 28).map((item, index) => {
            return (
              <BookforReadlist
                key={index} // key
                id={item.new_id} // OL......W
                bookISBN={item.isbn} // ISBN number -> this is required for ML model
                cover_img={item.img_url}
                title={item.title} // Title without brackets
                author={item.author} // Author
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

export default ReadList;
