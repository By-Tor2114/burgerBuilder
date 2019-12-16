import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        order: state.orders.concat(newOrder)
      };

    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
