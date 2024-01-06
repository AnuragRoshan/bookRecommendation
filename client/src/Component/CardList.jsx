import React, { useEffect, useState } from "react";
import splitNumbers from "../Assist/CardList";
import "../Styles/cardlist.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";
import { api } from "../Assist/env";

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
      .get(`${api}books/${number1}/${number2}`)
      .then((response) => {
        setBooks(response.data.books);
        // console.log(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

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
                <>
                  {props.topic === "recom" ? (
                    <>Recommended Books For You</>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {bookse ? (
          <>
            <div className="book-list">
              {/* Use map to dynamically render book list items */}
              {bookse.slice(5, 5 + nos).map((book, index) => (
                <CardComponent book={book} />
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
