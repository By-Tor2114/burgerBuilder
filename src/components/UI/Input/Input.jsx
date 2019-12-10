import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={classes.Input} {...props} />;
      break;
    case 'text-area':
      inputElement = <textarea className={classes.Input} {...props} />;
      break;
    default:
      inputElement = <input className={classes.Input} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
