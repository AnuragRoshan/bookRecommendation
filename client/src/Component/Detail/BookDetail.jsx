import React, { useEffect, useState } from "react";
import "../../Styles/detail.css";
import axios from "axios";

const BookDetail = (params) => {
  const [isbn, setisbn] = useState("");
  const [imgLoading, setImgLoading] = useState(true);
  const handleImageLoad = () => {
    setImgLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${params.id}`
        );
        const isb = response.data.docs[0].isbn[0];
        setisbn(response.data.docs[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isbn ? (
        <>
          {console.log(isbn)}
          <div className="book-detail">
            <div className="book-inner-detail">
              <div className="book-image">
                {imgLoading && <p style={{ height: "10rem" }}>Loading...</p>}
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${isbn.isbn[0]}-L.jpg`}
                  alt=""
                  srcset=""
                  onLoad={handleImageLoad}
                />
              </div>

              <div className="book-info">
                <div className="book-name">{isbn.title}</div>
                <div className="book-author">{isbn.author_name}</div>
                <div className="book-genre">Genre</div>
                <div className="book-rating">Rating</div>
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
