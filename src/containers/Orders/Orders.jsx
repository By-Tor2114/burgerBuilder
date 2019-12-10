import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };
  componentDidMount = async () => {
    try {
      const { data } = await axios.get('/orders.json');
      const orders = [];

      for (let key in data) {
        orders.push({ ...data[key], id: key });
      }

      this.setState({ orders, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
