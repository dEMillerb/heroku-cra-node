import React from 'react';
import '../App.scss';

const Email = props => {

    let formControl = "tgb-input";

    if (props.touched && !props.valid) {
        formControl = 'tgb-error';
    }

  return ( 
      <>
      <input type="email" className={formControl} {...props} />
      </>
  );
}

export default Email;