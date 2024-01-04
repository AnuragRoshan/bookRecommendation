import React, { useEffect, useState } from "react";
import splitNumbers from "../Assist/CardList";
import "../Styles/cardlist.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CardComponent from "./CardComponent";

const RecomCardList = (props) => {
  const { id } = useParams();
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
  }, [id]);

  const getData = async () => {
    console.log(id);
    const apiUrl = `http://localhost:5000/recomBook/${id}`;

    try {
      const response = await axios.get(apiUrl);
      setBooks(response.data || []); // Ensure that response.data is an array, or default to an empty array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        {bookse.length > 0 ? (
          <>
            <div className="book-list">
              {/* Use map to dynamically render book list items */}
              {bookse.slice(0, 4).map((book, index) => (
                <CardComponent key={index} book={book} />
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

export default RecomCardList;
