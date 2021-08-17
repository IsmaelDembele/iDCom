import React from "react";
import Title from "./Title";
import LandingPageContent from "./LandingPageContent";

const LandingPage = () => {
  return (
    <section id="landingPage">
      <div className="title">
        <Title />
      </div>
        <LandingPageContent />
    </section>
  );
};

export default LandingPage;
