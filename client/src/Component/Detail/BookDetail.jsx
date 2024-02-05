import React, { useEffect, useState } from "react";
import "../../Styles/detail.css";
import axios from "axios";
import { api } from "../../Assist/env";
import Bookmark from "../Bookmark";
import { Rating } from "react-simple-star-rating";
import { selectUserStatus, selectUsers } from "../../Features/userSlice";
import { useSelector } from "react-redux";

const BookDetail = (params) => {
  const users = useSelector(selectUsers);
  const userstatus = useSelector(selectUserStatus);
  const [isbn, setisbn] = useState("");
  const [rating, setRating] = useState(0);
  const [initialVal, setInitialVal] = useState();
  const [imgLoading, setImgLoading] = useState(true);
  const handleImageLoad = () => {
    setImgLoading(false);
  };
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  console.log(users.email);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}getbook/${params.id}`);
        setisbn(response.data.book);
        console.log(response.data.book);

        const currentUser = users.email;
        const userRating = response.data.book.ratings.find(
          (rating) => rating.username === currentUser
        );

        setRating(userRating ? userRating.rate : 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleRating = (rate) => {
    const data = axios.post(`${api}setrating`, {
      rating: rate,
      bookIsbn: isbn.isbn,
      username: users.email,
    });
    setRating(rate);
  };
  return (
    <>
      {isbn ? (
        <>
          {/* {console.log(isbn)} */}
          <div className="book-detail">
            <div className="book-inner-detail">
              <div className="book-image">
                {imgLoading && (
                  <div className="loading" style={{}}>
                    <div>Loading...</div>
                  </div>
                )}
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${isbn.isbn}-L.jpg`}
                  alt=""
                  srcset=""
                  onLoad={handleImageLoad}
                />
              </div>

              {userstatus ? (
                <>
                  <div
                    style={{
                      fontSize: "2rem",
                      marginInlineStart: "0.5rem",
                      marginBlockStart: "20%",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <Bookmark book={isbn} />
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="book-info">
                <div className="book-detail-name">
                  {truncateText(isbn.name, 50)}
                </div>
                <div className="book-detail-author">By {isbn.author}</div>
                <div className="book-detail-rating"></div>
                <div className="book-detail-rating">
                  Age : Between {isbn.age[0]} and {isbn.age[2]}
                  {isbn.age[3]}
                </div>
                <div className="book-desc">
                  {isbn.description &&
                    isbn.description.substring(4, isbn.description.length - 8)}
                </div>
                {userstatus ? (
                  <>
                    <div>
                      <Rating
                        onClick={(rate) => handleRating(rate)}
                        initialValue={rating ? rating : rating}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default BookDetail;
