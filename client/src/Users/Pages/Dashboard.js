import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import UserProductList from '../components/UserProductList';
import PaginationComponent from '../../shared/components/UIElements/PaginationComponent';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Dashboard.css';

const Dashboard = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  const auth = useContext(AuthContext);

  useEffect(() => {
    try {
      const sendReq = async () => {
        const responseData = await sendRequest(
          `http://localhost:8000/api/product/uid/${auth.userId}`
        );

        setLoadedProducts(responseData);
      };
      sendReq();
    } catch (error) {
      console.log(error);
    }
  }, [sendRequest, auth]);

  // Pagination helper
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPage = indexOfLastPost - productsPerPage;
  const currentProducts = loadedProducts.slice(
    indexOfFirstPage,
    indexOfLastPost
  );

  const deleteHandler = async (pid) => {
    try {
      await sendRequest(
        `http://localhost:8000/api/product/delete/${pid}`,
        'DELETE',
        {},
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.userId,
        }
      );
    } catch (error) {}
  };

  return (
    <div>
      {isLoading ? (
        <div className="center mt-2">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <React.Fragment>
          <div className="add-product">
            <Link to="/add">Add New Product</Link>
          </div>
          <UserProductList
            products={currentProducts}
            deleteHandler={deleteHandler}
          />
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

export default Dashboard;
