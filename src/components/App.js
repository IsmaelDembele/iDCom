import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "../pages/LandingPage";
import Electronics from "../pages/Electronics";
import Homes from "../pages/Homes";
import Books from "../pages/Books";
import Fashion from "../pages/Fashion";
import ShoppingCart from "../pages/ShoppingCart";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import Search from "../pages/Search";

import { ItemNumberContect } from "../Helper/context";
import { cartData } from "../data/cartData";

const App = () => {
  const [myCart, setMyCart] = useState(cartData);

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
            <Route exact path="/search">
              <Search />
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
            <Route exact path="/electronics">
              <Electronics />
            </Route>
            <Route exact path="/homes">
              <Homes />
            </Route>
            <Route exact path="/books">
              <Books />
            </Route>
            <Route exact path="/fashion">
              <Fashion />
            </Route>

            <Route exact path="*">
              <div>make an error path</div>
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
