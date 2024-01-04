import React from "react";
import Banner from "../../Component/Home/Banner";
import { useParams } from "react-router-dom";
import CardList from "../../Component/CardList";

const AllCardList = () => {
  const { min, max } = useParams();
  const age = min + " " + max;
  return (
    <div>
      <Banner />
      <CardList topic={"age"} detail={age} nos={500} color={"add8e6ee"} />
    </div>
  );
};

export default AllCardList;
