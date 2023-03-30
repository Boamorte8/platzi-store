import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://api.escuelajs.co/api/v1/products';

const useInitialState = () => {
  try {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      async function getProducts() {
        const response = await axios(API);
        // Another way to do it
        // const response = await fetch(API);
        // const data = await response.json();
        setProducts(response.data);
      }
      getProducts();
    }, []);

    return {
      products,
    };
  } catch (error) {
    return {
      products: [],
      error: typeof error === 'object' ? error.message : error,
    };
  }
};

export default useInitialState;
