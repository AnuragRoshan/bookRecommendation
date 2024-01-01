import React from "react";
import Banner from "../../Component/Likes/Banner";
import LikedCardList from "../../Component/LikedCardList";

const Likes = () => {
  return (
    <div style={{ paddingBlockStart: "4rem" }}>
      <Banner />
      <LikedCardList
        topic={"likes"}
        detail={""}
        nos={"99"}
        color={"ffdab9ee"}
      />
    </div>
  );
};

export default Likes;
