import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    isOrdering: false
  };

  componentDidMount = () => {
    this.props.onInitIngredients();
  };

  updateCanBuy = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((a, b) => {
        return a + b;
      });

    return sum > 0;
  };

  orderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ isOrdering: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancel = () => {
    this.setState({ isOrdering: false });
  };

  purchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const { isOrdering } = this.state;
    const {
      price,
      ings,
      error,
      onIngredientAdded,
      onIngredientRemoved,
      isAuthenticated
    } = this.props;

    const disabledInfo = {
      ...ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ings) {
      burger = (
        <Fragment>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            canBuy={this.updateCanBuy(ings)}
            order={this.orderHandler}
            isAuth={isAuthenticated}
            price={price}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          price={price}
          purchaseCancel={this.purchaseCancel}
          purchaseContinue={this.purchaseContinue}
        />
      );
    }

    return (
      <Fragment>
        <Modal modalClosed={this.purchaseCancel} show={isOrdering}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.burgerBuilder.error,
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => {
      dispatch(actions.addIngredient(ingredientName));
    },
    onIngredientRemoved: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
