import React from 'react';

import Button from './Button';
import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__img">
        <img
          src="https://contents.mediadecathlon.com/p1613535/k$a9f19526cc9f676ace426e478b470b9c/run-dry-men-s-running-t-shirt-petrol-blue.jpg?&f=452x452"
          alt={props.name}
        />
      </div>
      <div className="card__name">
        <h3>{props.name}</h3>
      </div>
      <div className="card__description">
        <p>{props.description}</p>
      </div>
      <div className="card__price">
        <Button name={`$${props.price}`} type="button" />
      </div>
    </div>
  );
};

export default Card;
