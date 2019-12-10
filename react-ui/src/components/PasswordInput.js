import React from 'react';
import '../App.scss';

const Password = props => {

    let formControl = "tgb-input";

    if (props.touched && !props.valid) {
        formControl = 'form-control control-error';
    }

  return ( 
      <>
      <input type="password" className={formControl} {...props} />
      </>
  );
}

export default Password;