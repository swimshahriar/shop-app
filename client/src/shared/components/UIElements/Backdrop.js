import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = (props) => {
  const backdropContent = (
    <div className="backdrop" onClick={props.onClick}></div>
  );
  return ReactDOM.createPortal(
    backdropContent,
    document.getElementById('backdrop')
  );
};

export default Backdrop;
