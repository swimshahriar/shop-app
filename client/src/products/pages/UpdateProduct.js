import React, { useEffect, useState } from 'react';
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

const DUMMY_Products = [
  {
    id: 'p1',
    name: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    price: 20,
    creator: 'u1',
  },
  {
    id: 'p2',
    name: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    price: 20,
    creator: 'u2',
  },
];

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

  const identifiedProduct = DUMMY_Products.find((p) => p.id === pid);

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
