import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProductsList from '../components/ProductsList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './AllProducts.css';

const AllProducts = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedProducts, setLoadedProduct] = useState([]);

  useEffect(() => {
    try {
      const sendReq = async () => {
        const responseData = await sendRequest(
          'http://localhost:8000/api/product/'
        );

        setLoadedProduct(responseData);
      };
      sendReq();
    } catch (error) {
      console.log(error);
    }
  }, [sendRequest]);

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
