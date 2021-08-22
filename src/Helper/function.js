import numeral from "numeral";

export const addToCart = (item,myCart,setMyCart,history) => {
  let find = false;
  let newCart = myCart;

  console.log(item);
  //if the element is already inside, then we augment the quantity
  for (const el of myCart) {
    if (el.id === item.id) {
      find = true;
      el.qty++;
      break;
    }
  }
  //if the element is not inside then we add it inside and set the quantity to one
  if (!find) {
    newCart.push({ ...item, qty: 1 });
    console.log(newCart);
    setMyCart(newCart);
    find = true;
  }

  find && history.push('/shopping');
};

export const numeral_totalPrice = myArray => {
  let myTotal = 0;
  myArray.forEach(item => {
    //put string-money to number '$100.45' -> 100.45
    const currentTotal = numeral(item.price);
    myTotal += currentTotal._value * item.qty;
  });
  return myTotal;
};

export const number_to_money = (number) => {
  //put number to money-string 9100.21 -> '$9,100.21'
  const money = numeral(number).format("$0,0.00");
  return money;
};

export const numeral_totalQuantity = myArray => {
  let total = 0;
  myArray.forEach(el => {
    total +=parseInt(el.qty) ;
  });
  return total;
};
