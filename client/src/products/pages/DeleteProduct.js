import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ShopContext } from '../../shared/context/ShopContext';
import { useHttpClient } from '../../shared/hooks/http-hook';

const DeleteProduct = (props) => {
  const { sendRequest, isLoading, error } = useHttpClient();
  const auth = useContext(ShopContext);
  const history = useHistory();
  const pid = useParams().pid;

  useEffect(() => {
    const sendReq = async () => {
      try {
        await sendRequest(
          `https://shop-app01.herokuapp.com/api/product/delete/${pid}`,
          'DELETE',
          {},
          {
            Authorization: 'Bearer ' + auth.token,
          }
        );
      } catch (error) {}
    };
    sendReq();
  }, [sendRequest, auth, pid]);

  if (isLoading) {
    return (
      <div className="center mt-2">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="center mt-2">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div
      className="center mt-2"
      onLoad={setTimeout(() => history.push('/dashboard'), 2000)}
    >
      <h1>Product Deleted!</h1>
    </div>
  );
};

export default DeleteProduct;
