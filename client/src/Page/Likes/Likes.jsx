import React from "react";
import CardList from "../../Component/CardList";
import Banner from "../../Component/Likes/Banner";

const Likes = () => {
  return (
    <div style={{ paddingBlockStart: "4rem" }}>
      <Banner />
      <CardList topic={"likes"} detail={"15 18"} nos={"9"} color={"ffdab9ee"} />
    </div>
  );
};

export default Likes;
