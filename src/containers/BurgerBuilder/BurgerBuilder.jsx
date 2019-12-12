import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    isOrdering: false,
    isLoading: false,
    error: null
  };

  componentDidMount = async () => {
    // try {
    //   const { data } = await axios.get('/ingredients.json');
    //   this.setState({ ingredients: data });
    // } catch (error) {
    //   this.setState({ error: true });
    // }
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
    this.setState({ isOrdering: true });
  };

  purchaseCancel = () => {
    this.setState({ isOrdering: false });
  };

  purchaseContinue = () => {
    const params = [];

    for (let i in this.state.ingredients) {
      params.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    params.push('price=' + this.state.totalPrice);

    const queryString = params.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const { isOrdering, isLoading, error } = this.state;

    const { price, ings, onIngredientAdded, onIngredientRemoved } = this.props;

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
            price={price}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancel={this.purchaseCancel}
          purchaseContinue={this.purchaseContinue}
          ingredients={ings}
          price={price}
        />
      );
    }

    if (isLoading) {
      orderSummary = <Spinner />;
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
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => {
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName });
    },
    onIngredientRemoved: ingredientName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
