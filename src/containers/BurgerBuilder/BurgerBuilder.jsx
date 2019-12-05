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
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    },
    totalPrice: 4
  };

  addIngredient = type => {
    const priceAddition = INGREDIENT_PRICES[type];

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

  removeIngredient = type => {};

  render() {
    const { ingredients } = this.state;
    return (
      <Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls ingredientAdded={this.addIngredient} />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
