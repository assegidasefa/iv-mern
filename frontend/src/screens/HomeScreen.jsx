import React, { useEffect, useState } from 'react';
import axios from '../axios';
import ProductList from '../components/ProductList';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/products');
      console.log("res",data)
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomeScreen;
