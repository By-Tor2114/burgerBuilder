import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    totalPrice: 4
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
  };

  render() {
    const { ingredients, totalPrice } = this.state;

    const disabledInfo = {
      ...ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientRemoved={this.removeIngredient}
          ingredientAdded={this.addIngredient}
          disabled={disabledInfo}
          price={totalPrice}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
