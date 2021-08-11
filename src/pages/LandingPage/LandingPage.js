import React from "react";
import Title from "./Title";
import Body from "./Body";

const LandingPage = () => {
  return (
    <section id="landingPage">
      <div className="title">
        <Title />
      </div>
        <Body />
    </section>
  );
};

export default LandingPage;
