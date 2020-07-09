import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './ProductForm.css';

const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pid = useParams().pid;

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

  const identifiedProduct = {};

  useEffect(() => {
    if (identifiedProduct) {
      setFormData(
        {
          price: {
            value: identifiedProduct.price,
            isValid: true,
          },
          description: {
            value: identifiedProduct.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedProduct]);

  const productUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedProduct) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="product-form" onSubmit={productUpdateSubmitHandler}>
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(10)]}
        errorText="Please enter a valid description (min. 10 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="price"
        element="input"
        type="text"
        label="Price"
        validators={[VALIDATOR_MIN(10)]}
        errorText="Please enter a valid price."
        onInput={inputHandler}
        initialValue={formState.inputs.price.value}
        initialValid={formState.inputs.price.isValid}
      />
      <Button type="submit" className="center" disabled={!formState.isValid}>
        Update
      </Button>
    </form>
  );
};

export default UpdateProduct;
