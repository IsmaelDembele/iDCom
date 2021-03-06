import numeral from "numeral";
// import MuiAlert from "@material-ui/lab/Alert";
import { PATH_ENDPOINTS } from "./constants";
import axios from "axios";

let https;
process.env.NODE_ENV === "production" ? (https = require("https")) : (https = require("http"));

// export const Alert = props => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// };

export const addToCart = (item, myCart, setMyCart, history) => {
  let find = false;
  let newCart = myCart;

  //if the element is already inside, then we augment the quantity
  for (const el of myCart) {
    if (el._id === item._id) {
      find = true;
      //We cannot buy more than nine times the same item
      if (+el.qty === 9) {
        alert("Maximun quantity reached for this item");
      } else {
        el.qty++;
      }
      break;
    }
  }
  //if the element is not inside then we add it inside and set the quantity to one
  if (!find) {
    newCart.push({ ...item, qty: 1 });
    setMyCart(newCart);
    find = true;
  }

  find && history.push("/" + PATH_ENDPOINTS.SHOPPING);
};

//return the sume of the prices of the items in the shopping cart
export const numeral_totalPrice = myArray => {
  let myTotal = 0;
  myArray.forEach(item => {
    //put money to number '$100.45' -> 100.45
    const currentTotal = numeral(item.price);
    myTotal += currentTotal._value * item.qty;
  });
  return myTotal;
};

export const number_to_money = number => {
  //put number to money: ie 9100.21 -> '$9,100.21'
  const money = numeral(number).format("$0,0.00");
  return money;
};

export const totalQuantity = myArray => {
  let total = 0;
  myArray.forEach(el => {
    total += parseInt(el.qty);
  });
  return total;
};

//Take and id and return the position of the item it belongs to inside an array of item
export const myIndex = (id, myArray) => {
  let index;
  myArray.forEach((el, i) => {
    if (el._id === id) index = i;
  });

  return index;
};

export const getCsrfToken = async path => {
  //this function will get the csrf token from the back-end
  const instance = axios.create({
    withCredentials: true,
    httpAgent: new https.Agent({
      rejectUnauthorized: false,
      requestCert: true,
      keepAlive: true,
    }),
  });
  const csrfToken = await instance.get(`${path}/${PATH_ENDPOINTS.CSRF}`);
  return csrfToken;
};
