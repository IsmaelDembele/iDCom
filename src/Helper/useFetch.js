import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useFetch = (url, arg = {}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    let response = await axios.get(url, arg);

    const products = await response.data;
    setProducts(products);
    setLoading(false);
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    getProducts();
  }, [url, getProducts]);
  return { loading, products };
};
