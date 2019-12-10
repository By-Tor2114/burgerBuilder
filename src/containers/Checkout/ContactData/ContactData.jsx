import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: ''
    },
    isLoading: false
  };

  orderHandler = event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        address: {
          name: 'John Doe',
          street: 'Test Street',
          postCode: 'NN6 0EE',
          country: 'UK'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postCode"
          placeholder="Post Code"
        />
        <Button clicked={this.orderHandler} buttonType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.state.isLoading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
