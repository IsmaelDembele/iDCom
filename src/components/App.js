import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { myContext } from "../Helper/context";
import { useFetch } from "../Helper/useFetch";
import { PATH_ENDPOINTS } from "../Helper/constants";
import { getCsrfToken } from "../Helper/function";
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
const VerifyEmail = React.lazy(() => import("../pages/VerifyEmail"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const Register = React.lazy(() => import("../pages/Register"));
const PasswordReset = React.lazy(() => import("../pages/PasswortReset"));

axios.defaults.withCredentials = true;

const path = process.env.REACT_APP_PATH;

const App = () => {
  const [myCart, setMyCart] = useState([]);
  const [myData, setMyData] = useState([]);
  const [isLoggin, setIsLoggin] = useState(false);
  const { loading, products } = useFetch(`${path}/${PATH_ENDPOINTS.PRODUCTS}`);

  useEffect(() => {
    //=>getting the csrf token
    getCsrfToken(path)
      .then(res => {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = res.data;
      })
      .catch(err => {
        console.log("Can't get the csrf token", err);
      });
  }, [isLoggin]);

  useEffect(() => {
    setMyData(products);
    //=> So that the number of item inside the shopping cart appers everywhere
    const cart = JSON.parse(localStorage.getItem("myCart"));
    cart && setMyCart(cart);
  }, [products]);

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
                props.location.pathname !== `/${PATH_ENDPOINTS.SIGN_IN}` &&
                props.location.pathname !== `/${PATH_ENDPOINTS.REGISTER}` && <Header />
              }
            />
            {loading && <CircularProgress className="circular-progress" />}
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.SHOPPING}`}>
                <ShoppingCart />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.SIGN_IN}`}>
                <SignIn />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.REGISTER}`}>
                <Register />
              </Route>
              <ProtectedRoute exact path={`/${PATH_ENDPOINTS.ACCOUNT}`} component={Account} />

              <Route exact path={`/${PATH_ENDPOINTS.SEARCH}/:id`}>
                <SearchPage />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.PRODUCTS}/:id`}>
                <Products />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.ITEM_REVIEW}/:id`}>
                <ItemReview />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.VERIFY_EMAIL}/:id`}>
                <VerifyEmail />
              </Route>
              <Route exact path={`/${PATH_ENDPOINTS.PASSWORD_RESET}/:id`}>
                <PasswordReset />
              </Route>

              <Route exact path="*">
                <div id="error-page">404 Page not found</div>
              </Route>
            </Switch>

            <Route
              path="*"
              render={props =>
                props.location.pathname !== `/${PATH_ENDPOINTS.SIGN_IN}` &&
                props.location.pathname !== `/${PATH_ENDPOINTS.REGISTER}` && <Footer />
              }
            />
          </Router>
        </div>
      </Suspense>
    </myContext.Provider>
  );
};

export default App;
