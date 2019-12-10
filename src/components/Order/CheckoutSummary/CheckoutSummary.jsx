import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button clicked={checkoutCancelled} buttonType="Danger">
        CANCEL
      </Button>
      <Button clicked={checkoutContinued} buttonType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
