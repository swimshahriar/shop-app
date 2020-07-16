import React from 'react';

import UserProduct from './UserProduct';
import './UserProductList.css';

const UserProductsList = (props) => {
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
        <UserProduct
          key={product._id}
          id={product._id}
          name={product.name}
          imageURL={product.imageURL}
          description={product.description}
          price={product.price}
          deleteHandler={props.deleteHandler}
        />
      ))}
    </div>
  );
};

export default UserProductsList;
