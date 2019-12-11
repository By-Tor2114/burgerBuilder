import React, { Fragment, Component } from 'react';
import Button from '../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const { ingredients, price, purchaseCancel, purchaseContinue } = this.props;

    const ingredientSummary = Object.keys(ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {ingredients[igKey]}
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          {' '}
          <strong> Total Price: £{price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button clicked={purchaseCancel} buttonType={'Danger'}>
          CANCEL
        </Button>
        <Button clicked={purchaseContinue} buttonType={'Success'}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
