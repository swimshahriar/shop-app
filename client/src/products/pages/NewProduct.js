import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MIN,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ProductForm.css';

const NewProduct = () => {
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

  const addBtnHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
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
      <Button type="submit" className="center" disabled={!formState.isValid}>
        Add
      </Button>
    </form>
  );
};

export default NewProduct;
