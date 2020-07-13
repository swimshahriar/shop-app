import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProductForm.css';

const UpdateProduct = () => {
  const pid = useParams().pid;
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      price: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/product/${pid}`
        );
        setLoadedProduct(responseData);

        setFormData(
          {
            price: {
              value: responseData.price,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchProduct();
  }, [sendRequest, pid, setFormData]);

  const productUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    clearError();

    try {
      await sendRequest(
        `http://localhost:8000/api/product/edit/${pid}`,
        'PATCH',
        JSON.stringify({
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      history.push('/');
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center mt-2">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (!loadedProduct && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Product!</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className="product-form" onSubmit={productUpdateSubmitHandler}>
      {!isLoading && loadedProduct && (
        <React.Fragment>
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText="Please enter a valid description (min. 10 characters)."
            onInput={inputHandler}
            initialValue={loadedProduct.description}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="text"
            label="Price"
            validators={[VALIDATOR_MIN(10)]}
            errorText="Please enter a valid price."
            onInput={inputHandler}
            initialValue={loadedProduct.price}
            initialValid={true}
          />
          <Button
            type="submit"
            className="center"
            disabled={!formState.isValid}
          >
            Update
          </Button>
        </React.Fragment>
      )}
      {error && (
        <div className="center errorText mt-2">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default UpdateProduct;
