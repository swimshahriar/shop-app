import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProductsList from '../components/ProductsList';
import './AllProducts.css';
import Axios from 'axios';

const AllProducts = () => {
  const [loadedProducts, setLoadedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      const sendReq = async () => {
        const { data } = await Axios.get('http://localhost:8000/api/product/');

        setLoadedProduct(data);
        setIsLoading(false);
      };
      sendReq();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="all-products">
      {isLoading ? (
        <div className="center mt-2">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <ProductsList products={loadedProducts} />
      )}
    </div>
  );
};

export default AllProducts;
