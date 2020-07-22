import React, { useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Image from '../../shared/components/UIElements/Image';
import Button from '../../shared/components/FormElements/Button';
import { ShopContext } from '../../shared/context/ShopContext';
import './Product.css';

const Product = (props) => {
  const shopCart = useContext(ShopContext);
  const addToCartHandler = () => {
    shopCart.cartFunction({
      ...props.product,
      quantity: 1,
      totalPrice: props.price,
    });
  };

  return (
    <Card>
      <div className="product">
        <div className="center">
          <Image src={props.imageURL} name={props.name} />
        </div>
        <div className="product__info">
          <div className="product__name">
            <h2>{props.name}</h2>
          </div>
          <div className="product__description">
            <h3>{props.description}</h3>
          </div>
          <div className="product__price">
            <h3>$ {props.price}</h3>
          </div>
        </div>

        <div className="product__btn">
          <Button type="button" onClick={addToCartHandler} className="btn-cart">
            Add To Cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Product;
