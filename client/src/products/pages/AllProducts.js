import React from 'react';

import ProductsList from '../components/ProductsList';
import './AllProducts.css';

const AllProducts = () => {
  const products = [
    {
      id: 'u1',
      name: 'product name 1',
      imageURL: 'https://i.ibb.co/GsySGcw/white-compressor.png',
      description: 'This is a product description.',
      price: 10.5,
    },
    {
      id: 'u2',
      name: 'product name 2',
      imageURL: 'https://i.ibb.co/GsySGcw/white-compressor.png',
      description: 'This is a product description.',
      price: 11.5,
    },
    {
      id: 'u3',
      name: 'product name 3',
      imageURL: 'https://i.ibb.co/GsySGcw/white-compressor.png',
      description: 'This is a product description.',
      price: 12.5,
    },
  ];

  return (
    <div className="all-products">
      <ProductsList products={products} />
    </div>
  );
};

export default AllProducts;
