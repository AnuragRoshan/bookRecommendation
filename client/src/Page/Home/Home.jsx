import React from "react";
import CardList from "../../Component/CardList";
import Banner from "../../Component/Home/Banner";

const Home = () => {
  return (
    <div style={{ paddingBlockStart: "4rem" }}>
      <Banner />
      <CardList topic={"age"} detail={"0 2"} nos={"4"} color={"add8e6ee"} />
      <CardList topic={"age"} detail={"3 5"} nos={"4"} color={"98fb98ee"} />
      <CardList topic={"age"} detail={"6 8"} nos={"4"} color={"ffb6c1ee"} />
      <CardList topic={"age"} detail={"9 12"} nos={"4"} color={"ffdab9ee"} />
      <CardList topic={"recom"} detail={"2 5"} nos={"4"} color={"add8e6ee"} />
    </div>
  );
};

export default Home;
