import React, { useEffect, useState } from "react";
import splitNumbers from "../Assist/CardList";
import "../Styles/cardlist.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CardComponent from "./CardComponent";

const SearchCardList = (props) => {
  const { searchInput } = useParams();
  const { number1, number2 } = splitNumbers(props.detail);
  const dynamicStyles = {
    "--primary-color": `#${props.color}`, // Set your dynamic color here
  };

  const [bookse, setBooks] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch books within the specified age range
    getData();
  }, [searchInput]);

  const getData = async () => {
    // console.log(id);
    const apiUrl = `{api}search/${searchInput}`;

    try {
      const response = await axios.get(apiUrl);
      console.log(response.data.books);
      setBooks(response.data.books || []); // Ensure that response.data is an array, or default to an empty array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="cards-top" style={dynamicStyles}>
      <div className="cards-inner-top">
        <div className="cards-head">
          Search Results for{" "}
          <span style={{ fontStyle: "italic" }}>{searchInput}</span>
        </div>
        {bookse.length > 0 ? (
          <>
            <div
              style={{
                paddingInline: "2rem",
                fontWeight: "600",
              }}
            >
              Total {bookse.length} results found
            </div>
            <div className="book-list">
              {/* Use map to dynamically render book list items */}
              {bookse.slice(0, 577).map((book, index) => (
                <CardComponent key={index} book={book} />
              ))}
            </div>
          </>
        ) : (
          <div
            div
            style={{ textAlign: "center", padding: "5rem", fontWeight: "600" }}
          >
            No result found{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCardList;
