import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isLoading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { ...action.orderData, id: action.id };

      return {
        ...state,
        isLoading: false,
        order: state.orders.concat(newOrder),
        purchased: true
      };

    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        isLoading: false
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
