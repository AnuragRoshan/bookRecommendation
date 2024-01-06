import React from "react";
import Banner from "../../Component/Likes/Banner";
import LikedCardList from "../../Component/LikedCardList";
import SearchCardList from "../../Component/SearchCardList";
import { useParams } from "react-router-dom";

const Search = () => {
  return (
    <div style={{ paddingBlockStart: "4rem" }}>
      <SearchCardList
        topic={"search"}
        detail={""}
        nos={"99"}
        color={"ffdab9ee"}
      />
    </div>
  );
};

export default Search;
