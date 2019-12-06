import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    canBuy: false,
    isOrdering: false
  };

  updateCanBuy = () => {
    const ingredients = { ...this.state.ingredients };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((a, b) => {
        return a + b;
      });

    this.setState({ canBuy: sum > 0 });
  };

  addIngredient = type => {
    const priceAddition = INGREDIENT_PRICES[type];

    if (this.state.ingredients[type] === 5) {
      return alert(`Whoa! I think there's enough ${type} in there now!`);
    }

    this.setState(currentState => {
      return {
        totalPrice: currentState.totalPrice + priceAddition,
        ingredients: {
          ...currentState.ingredients,
          [type]: currentState.ingredients[type] + 1
        }
      };
    });

    setTimeout(() => {
      this.updateCanBuy();
    }, 100);
  };

  removeIngredient = type => {
    const priceAddition = INGREDIENT_PRICES[type];

    this.setState(currentState => {
      return {
        totalPrice: currentState.totalPrice - priceAddition,
        ingredients: {
          ...currentState.ingredients,
          [type]: currentState.ingredients[type] - 1
        }
      };
    });

    setTimeout(() => {
      this.updateCanBuy();
    }, 100);
  };

  orderHandler = () => {
    this.setState({ isOrdering: true });
  };

  purchaseCancel = () => {
    this.setState({ isOrdering: false });
  };

  purchaseContinue = () => {
    alert('You continue');
  };

  render() {
    const { ingredients, totalPrice, canBuy, isOrdering } = this.state;

    const disabledInfo = {
      ...ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Fragment>
        <Modal modalClosed={this.purchaseCancel} show={isOrdering}>
          <OrderSummary
            purchaseCancel={this.purchaseCancel}
            purchaseContinue={this.purchaseContinue}
            ingredients={ingredients}
            price={totalPrice}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientRemoved={this.removeIngredient}
          ingredientAdded={this.addIngredient}
          disabled={disabledInfo}
          price={totalPrice}
          canBuy={canBuy}
          order={this.orderHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
