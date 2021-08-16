import numeral from "numeral";

export const numaral_totalPrice = myArray => {
  let myTotal = 0;
  myArray.forEach(item => {
    //put string-money to number '$100.45' -> 100.45
    const currentTotal = numeral(item.price);
    myTotal += currentTotal._value;
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
