import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserStatus, selectUsers } from "../Features/userSlice";
import { api } from "../Assist/env";
import Bookmark from "./Bookmark";

const CardComponent = ({ book }) => {
  const users = useSelector(selectUsers);
  const userStatus = useSelector(selectUserStatus);
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

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
          {/* <div className="book-name">{truncateText(book.name, 22)}</div> */}
          {/* <div className="book-author">{book.author}</div> */}
          {/* {book.rating ? (
            <>
              <div className="book-genre">Rating : {book.rating}/5</div>
            </>
          ) : (
            <></>
          )} */}

          {/* <div className="book-genre">
            Age : Between {book.age[0]} and {book.age[2]}
            {book.age[3]}
          </div>
          <div className="book-genre">ISBN : {book.isbn}</div> */}
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
            {userStatus ? (
              <>
                <Bookmark book={book} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
