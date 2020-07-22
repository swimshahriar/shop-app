import React from 'react';

import Product from './Product';
import './ProductsList.css';

const ProductsList = (props) => {
  if (props.products.length === 0) {
    return (
      <div className="center">
        <h2>No Products Found!</h2>
      </div>
    );
  }

  return (
    <div className="products-list">
      {props.products.map((product) => (
        <Product
          key={product._id}
          id={product._id}
          name={product.name}
          imageURL={product.imageURL}
          description={product.description}
          price={product.price}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductsList;
