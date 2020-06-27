import React from 'react';

import Card from '../../Shared/Components/UIElements/Card';

import './ProductList.css';

const ProductList = () => {
  const DUMMY_LIST = [
    {
      id: 1,
      name: 'shirt',
      description: 'this is a test product',
      price: 10,
    },
    {
      id: 2,
      name: 'pant',
      description: 'this is a test product',
      price: 13.5,
    },
    {
      id: 3,
      name: 'pant',
      description: 'this is a test product',
      price: 13.5,
    },
    {
      id: 4,
      name: 'pant',
      description: 'this is a test product',
      price: 15.5,
    },
    {
      id: 5,
      name: 'pant',
      description: 'this is a test product',
      price: 15.5,
    },
  ];

  return (
    <div className="product-list">
      {DUMMY_LIST.map((prod) => {
        return (
          <div className="card-container">
            <Card
              key={prod.id}
              name={prod.name}
              description={prod.description}
              price={prod.price}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
