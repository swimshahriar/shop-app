import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Image from '../../shared/components/UIElements/Image';
import './UserProduct.css';

const UserProduct = (props) => {
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

        <div className="product__options">
          <div>
            <Link to={`/update/${props.id}`}>Edit</Link>
          </div>
          <div>
            <Link to={`/delete/${props.id}`}>Delete</Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProduct;
