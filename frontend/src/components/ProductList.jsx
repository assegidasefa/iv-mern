import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <p>In Stock: {product.countInStock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
