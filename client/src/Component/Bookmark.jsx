import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../Assist/env";
import { useSelector } from "react-redux";
import { selectUsers } from "../Features/userSlice";

const Bookmark = ({ book }) => {
  console.log(book);
  const users = useSelector(selectUsers);
  const [isBookmarked, setisBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setisBookmark = async () => {
    setIsLoading(true);
    await axios.post(`${api}toggleBookmark`, formData).then((response) => {
      setIsLoading(false);
      console.log(response);
    });
    // console.log(formData);
  };

  const [formData, setFormData] = useState({
    username: users.email,
    bookId: book._id,
  });

  useEffect(() => {
    if (book.like && book.like.includes(`${users.email}`)) {
      setisBookmarked(true);
    }
    // console.log("SHoot Only in beginning");
  }, []);
  const toggleTrue = () => {
    setisBookmarked(true);
    setisBookmark();
  };

  const toggleFalse = () => {
    setisBookmarked(false);
    setisBookmark();
  };
  return (
    <>
      {isBookmarked ? (
        <>
          {isLoading ? (
            <>
              <div style={{ cursor: "not-allowed" }}>
                <i class="fa-solid fa-heart"></i>
              </div>
            </>
          ) : (
            <>
              <div onClick={toggleFalse}>
                <i class="fa-solid fa-heart"></i>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <>
              <div style={{ cursor: "not-allowed" }}>
                <i class="fa-regular fa-heart"></i>
              </div>
            </>
          ) : (
            <>
              <div onClick={toggleTrue}>
                <i class="fa-regular fa-heart"></i>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Bookmark;
