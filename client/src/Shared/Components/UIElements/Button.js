import React from 'react';

import './Button.css';

const Button = ({ name, type, customClass }) => {
  return (
    <div>
      <button className={`btn ${customClass}`} type={type}>
        {name}
      </button>
    </div>
  );
};

export default Button;
