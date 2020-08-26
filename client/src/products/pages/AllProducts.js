import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProductsList from '../components/ProductsList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PaginationComponent from '../../shared/components/UIElements/PaginationComponent';
import './AllProducts.css';

const AllProducts = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  useEffect(() => {
    try {
      const sendReq = async () => {
        const responseData = await sendRequest(
          'https://shop-app01.herokuapp.com/api/product/'
        );

        setLoadedProducts(responseData);
      };
      sendReq();
    } catch (error) {
      console.log(error);
    }
  }, [sendRequest]);

  // Pagination helper
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPost - productsPerPage;
  const currentProducts = loadedProducts.slice(
    indexOfFirstPage,
    indexOfLastPost
  );

  return (
    <div className="all-products">
      {isLoading ? (
        <div className="center mt-2">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <React.Fragment>
          <ProductsList products={currentProducts} />
          <PaginationComponent
            totalProducts={loadedProducts.length}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
            page={currentPage}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default AllProducts;
