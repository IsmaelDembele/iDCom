import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer";
import LandingPage from "../pages/LandingPage";
import Products from "../pages/Products";
import SearchPage from "../pages/SearchPage";
import ItemReview from "../pages/ItemReview";
import ShoppingCart from "../pages/ShoppingCart";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import Account from "../pages/Account";
import { ProtectedRoute } from "./Protected";

import CircularProgress from "@material-ui/core/CircularProgress";

import { myContext } from "../Helper/context";
import { useFetch } from "../Helper/useFetch";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  const [myCart, setMyCart] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoggin, setIsLoggin] = useState(false);
  const { loading, products } = useFetch("http://localhost:5000/products");
  // const {products: status} = useFetch("http://localhost:5000/sign");

  useEffect(() => {
    console.log("loop test");
    // setIsLoggin(status);
    setMyData(products);
  }, [products]);

  useEffect(() => {
    console.log("user is loggin is " + isLoggin);
    //=> So that the number of item inside the shopping cart appers everywhere
    const cart = JSON.parse(localStorage.getItem("myCart"));
    cart && setMyCart(cart);
    // setIsLoggin(status);
  }, []);

  return (
    <myContext.Provider value={{ myCart, setMyCart, myData, isLoggin, setIsLoggin }}>
      <div className="layout">
        <Router>
          <Route
            path="*"
            render={props =>
              props.location.pathname !== "/sign" &&
              props.location.pathname !== "/register" && <Header />
            }
          />
          {loading && (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: "10000",
                color: "blue",
              }}
            />
          )}
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
            <ProtectedRoute exact path="/account" component={Account} />

            <Route exact path="/search/:id">
              <SearchPage />
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
    </myContext.Provider>
  );
};

export default App;
