import React, { useEffect, useState } from "react";
import splitNumbers from "../Assist/CardList";
import "../Styles/cardlist.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CardComponent from "./CardComponent";

const LikedCardList = (props) => {
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
      .get(`http://localhost:5000/getLikedBook`)
      .then((response) => {
        setBooks(response.data.likedBooks);
        // console.log(response.data.likedBooks);
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
            <>Books For Children Age</>
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
              {bookse.slice(0, 99).map((book, index) => (
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

export default LikedCardList;
