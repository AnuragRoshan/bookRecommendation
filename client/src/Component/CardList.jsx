import React, { useEffect, useState } from "react";
import splitNumbers from "../Assist/CardList";
import "../Styles/cardlist.css";
import axios from "axios";

const CardList = (props) => {
  let nos = Number(props.nos);
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const { number1, number2 } = splitNumbers(props.detail);
  const dynamicStyles = {
    "--primary-color": `#${props.color}`, // Set your dynamic color here
  };

  const [bookse, setBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch books within the specified age range
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`http://localhost:5000/books/${number1}/${number2}`)
      .then((response) => {
        setBooks(response.data.books);
        console.log(bookse);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  // Sample book data (replace this with your actual book data)
  const books = [
    { name: "Book Name 1", author: "Author 1", rating: "Rating 1" },
    { name: "Book Name 2", author: "Author 2", rating: "Rating 2" },
    { name: "Book Name 3", author: "Author 3", rating: "Rating 3" },
    { name: "Book Name 2", author: "Author 2", rating: "Rating 2" },
    { name: "Book Name 3", author: "Author 3", rating: "Rating 3" },
    { name: "Book Name 2", author: "Author 2", rating: "Rating 2" },
    { name: "Book Name 3", author: "Author 3", rating: "Rating 3" },
    { name: "Book Name 2", author: "Author 2", rating: "Rating 2" },
    { name: "Book Name 3", author: "Author 3", rating: "Rating 3" },
  ];

  return (
    <div className="cards-top" style={dynamicStyles}>
      <div className="cards-inner-top">
        <div className="cards-head">
          {props.topic === "age" ? (
            <>
              Books For Children Age {number1} to {number2}{" "}
            </>
          ) : (
            <>
              {props.topic === "likes" ? (
                <>Your Favourite Books</>
              ) : (
                <>{props.topic === "recom" ? <>Recommended Books</> : <></>}</>
              )}
            </>
          )}
        </div>
        {bookse ? (
          <>
            <div className="book-list">
              {/* Use map to dynamically render book list items */}
              {bookse.slice(10, 10 + nos).map((book, index) => (
                <div key={index} className="book-list-item">
                  <div className="book-img">
                    {/* Use actual image source here if book.isbn exists, otherwise skip this book */}
                    {book.isbn && (
                      <img
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                        alt=""
                        srcSet=""
                      />
                    )}
                  </div>
                  <div className="book-detail">
                    <div className="book-name">
                      {truncateText(book.name, 25)}
                    </div>
                    <div className="book-author">{book.author}</div>
                    <div className="book-genre">Rating : {book.rating}/5</div>
                    <div className="book-genre">
                      Age : Between {book.age[0]} and {book.age[2]}
                      {book.age[3]}
                    </div>
                    <div className="book-genre">ISBN : {book.isbn}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>Loading....</>
        )}
      </div>
    </div>
  );
};

export default CardList;
