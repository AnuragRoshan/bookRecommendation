import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetail from "../../Component/Detail/BookDetail";
import CardList from "../../Component/CardList";
import axios from "axios";

const Detail = () => {
  // Empty dependency array to run the effect only once when the component mounts

  const { id } = useParams();

  return (
    <div style={{ paddingBlock: "4rem" }}>
      <BookDetail id={id} />
      <CardList topic={"recom"} detail={""} nos={"3"} />
    </div>
  );
};

export default Detail;
