import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import LandingPage from "../pages/LandingPage";
import Products from "../pages/Products";
import ItemReview from "../pages/ItemReview";
import ShoppingCart from "../pages/ShoppingCart";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

import { ItemNumberContect } from "../Helper/context";
import { cartData } from "../data/cartData";

const App = () => {
  const [myCart, setMyCart] = useState([]);

  return (
    <ItemNumberContect.Provider value={{ myCart, setMyCart }}>
      <div className="layout">
        <Router>
          <Route
            path="*"
            render={props =>
              props.location.pathname !== "/sign" &&
              props.location.pathname !== "/register" && <Header />
            }
          />

          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/shopping">
              <ShoppingCart />
            </Route>
            <Route exact path="/sign">
              <SignIn />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/products/:id">
              <Products />
            </Route>
            <Route exact path="/itemreview/:id">
              <ItemReview />
            </Route>

            <Route exact path="*">
              <div id="error-page">404 Page not found</div>
            </Route>
          </Switch>

          <Route
            path="*"
            render={props =>
              props.location.pathname !== "/sign" &&
              props.location.pathname !== "/register" && <Footer />
            }
          />
        </Router>
      </div>
    </ItemNumberContect.Provider>
  );
};

export default App;
