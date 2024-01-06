import React, { useEffect, useState } from "react";
import "../../Styles/detail.css";
import axios from "axios";

const BookDetail = (params) => {
  const [isbn, setisbn] = useState("");
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getbook/${params.id}`
        );
        setisbn(response.data.book);
        // console.log(isbn);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);
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

              <div className="book-info">
                <div className="book-detail-name">
                  {truncateText(isbn.name, 50)}
                </div>
                <div className="book-detail-author">By {isbn.author}</div>
                <div className="book-detail-rating">
                  Rating : {isbn.rating} / 5
                </div>
                <div className="book-detail-rating">
                  Age : Between {isbn.age[0]} and {isbn.age[2]}
                  {isbn.age[3]}
                </div>
                <div className="book-desc">
                  {isbn.description &&
                    isbn.description.substring(4, isbn.description.length - 8)}
                </div>
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
