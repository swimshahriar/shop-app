import React from 'react';

import './Image.css';

const Image = (props) => (
  <div className="img">
    <img src={props.src} alt={props.name} />
  </div>
);

export default Image;
