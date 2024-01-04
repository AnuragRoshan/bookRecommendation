import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CardComponent = ({ book }) => {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const [isBookmarked, setisBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "rahul123@gmail.com",
    bookId: book._id,
  });

  useEffect(() => {
    if (book.like && book.like.includes("rahul123@gmail.com")) {
      setisBookmarked(true);
    }
    // console.log("SHoot Only in beginning");
  }, []);

  const setisBookmark = async () => {
    setIsLoading(true);
    await axios
      .post("http://localhost:5000/toggleBookmark", formData)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
      });
    // console.log(formData);
  };

  const toggleTrue = () => {
    setisBookmarked(true);
    setisBookmark();
  };

  const toggleFalse = () => {
    setisBookmarked(false);
    setisBookmark();
  };

  return (
    <div>
      <div className="book-list-item">
        <Link to={`/detail/${book.name}`}>
          <div className="book-img">
            {/* Use actual image source here if book.isbn exists, otherwise skip this book */}
            {book.isbn && (
              <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                alt={`${book.name}`}
                srcSet=""
              />
            )}
          </div>
        </Link>
        <div className="book-detail">
          <div className="book-name">{truncateText(book.name, 22)}</div>
          <div className="book-author">{book.author}</div>
          {book.rating ? (
            <>
              <div className="book-genre">Rating : {book.rating}/5</div>
            </>
          ) : (
            <></>
          )}

          <div className="book-genre">
            Age : Between {book.age[0]} and {book.age[2]}
            {book.age[3]}
          </div>
          <div className="book-genre">ISBN : {book.isbn}</div>
          <div
            // className="book-bookmark"
            style={{
              padding: "0.5rem",
              width: "max-content",
              borderRadius: "0.5rem",
              color: "#242424",
              fontSize: "1.5rem",
            }}
          >
            {isBookmarked ? (
              <>
                {isLoading ? (
                  <>
                    <div style={{ cursor: "not-allowed" }}>
                      <i class="fa-solid fa-bookmark"></i>
                    </div>
                  </>
                ) : (
                  <>
                    <div onClick={toggleFalse}>
                      <i class="fa-solid fa-bookmark"></i>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <>
                    <div style={{ cursor: "not-allowed" }}>
                      <i class="fa-regular fa-bookmark"></i>
                    </div>
                  </>
                ) : (
                  <>
                    <div onClick={toggleTrue}>
                      <i class="fa-regular fa-bookmark"></i>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
