import React from 'react';

import './FormInput.css';

const FormInput = ({ type, placeholder, size, value, onChange }) => {
  return (
    <div className="form__input">
      <input
        className="form__input-area"
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
        placeholder={placeholder}
        size={size}
      />
    </div>
  );
};

export default FormInput;
