import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { ShopContext } from '../../shared/context/ShopContext';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './ProductForm.css';

const NewProduct = () => {
  const auth = useContext(ShopContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      productName: {
        val: '',
        isValid: false,
      },
      productImage: {
        val: '',
        isValid: false,
      },
      productDescription: {
        val: '',
        isValid: false,
      },
      productPrice: {
        val: 0,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const addBtnHandler = async (event) => {
    event.preventDefault();
    clearError();

    try {
      await sendRequest(
        'https://shop-app01.herokuapp.com/api/product/add',
        'POST',
        JSON.stringify({
          name: formState.inputs.productName.value,
          imageURL: formState.inputs.productImage.value,
          description: formState.inputs.productDescription.value,
          price: formState.inputs.productPrice.value,
          userId: auth.userId,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token,
        }
      );
      alert('Product Added Successfully!');
      history.push('/');
    } catch (error) {}
  };

  return (
    <form className="product-form" onSubmit={addBtnHandler}>
      <Input
        element="input"
        id="productName"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid Name."
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="productImage"
        type="link"
        label="Image Url"
        placeholder="https://"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid URL."
        onInput={inputHandler}
      />
      <Input
        element="textarea"
        id="productDescription"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Minimum 10 characters."
        onInput={inputHandler}
      />
      <Input
        element="input"
        id="productPrice"
        type="text"
        label="Price"
        validators={[VALIDATOR_MIN(10)]}
        errorText="Minimum price is $10"
        onInput={inputHandler}
      />
      {error && (
        <div className="center errorText">
          <p>{error}</p>
        </div>
      )}
      {isLoading ? (
        <div className="center mt-2">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Button type="submit" className="center" disabled={!formState.isValid}>
          Add
        </Button>
      )}
    </form>
  );
};

export default NewProduct;
