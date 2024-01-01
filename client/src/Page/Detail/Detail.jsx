import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "../../Component/Detail/BookDetail";
import CardList from "../../Component/CardList";
import axios from "axios";
import Banner from "../../Component/Home/Banner";

const Detail = () => {
  // Empty dependency array to run the effect only once when the component mounts

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.scrollTo(0, 0);
    };
  }, [id]);

  return (
    <div style={{ paddingBlock: "4rem" }}>
      {/* <Banner /> */}
      <BookDetail id={id} />
      <CardList topic={"recom"} detail={"2 5"} nos={"4"} color={"add8e6ee"} />
    </div>
  );
};

export default Detail;
