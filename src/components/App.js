import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "../pages/LandingPage/LandingPage";

const App = () => {
  return (
    <div className='layout'>
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default App;
