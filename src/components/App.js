import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { myContext } from "../Helper/context";
import { useFetch } from "../Helper/useFetch";
import axios from "axios";

import CircularProgress from "@material-ui/core/CircularProgress";
import LandingPage from "../pages/LandingPage";
import Header from "./Header/Header";
import Footer from "./Footer";
import { ProtectedRoute } from "../components/Protected";

const Account = React.lazy(() => import("../pages/Account"));
const Products = React.lazy(() => import("../pages/Products"));
const SearchPage = React.lazy(() => import("../pages/SearchPage"));
const ItemReview = React.lazy(() => import("../pages/ItemReview"));
const ShoppingCart = React.lazy(() => import("../pages/ShoppingCart"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const Register = React.lazy(() => import("../pages/Register"));

axios.defaults.withCredentials = true;

const path = "https://idcom-server.herokuapp.com";
// const path = "http://localhost:5000";

const App = () => {
  const [myCart, setMyCart] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoggin, setIsLoggin] = useState(false);
  const { loading, products } = useFetch(`${path}/products`);

  useEffect(() => {
    setMyData(products);
  }, [products]);

  useEffect(() => {
    //=> So that the number of item inside the shopping cart appers everywhere
    const cart = JSON.parse(localStorage.getItem("myCart"));
    cart && setMyCart(cart);
  }, []);

  return (
    <myContext.Provider value={{ myCart, setMyCart, myData, isLoggin, setIsLoggin, path }}>
      <Suspense
        fallback={
          <div>
            <CircularProgress className="circular-progress" />
          </div>
        }
      >
        <div className="layout">
          <Router>
            <Route
              //the header is not display on the sign and register page
              path="*"
              render={props =>
                props.location.pathname !== "/sign" &&
                props.location.pathname !== "/register" && <Header />
              }
            />
            {loading && <CircularProgress className="circular-progress" />}
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
      </Suspense>
    </myContext.Provider>
  );
};

export default App;
