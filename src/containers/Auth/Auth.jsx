import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail Address'
        },
        value: '',
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password (at least 6 characters)'
        },
        value: '',
        validation: { required: true, minLength: 6 },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  checkValidation = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName.id]: {
        ...this.state.controls[controlName.id],
        value: event.target.value,
        valid: this.checkValidation(
          event.target.value,
          this.state.controls[controlName.id].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHanlder = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(currentState => {
      return {
        isSignUp: !currentState.isSignUp
      };
    });
  };

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangeHandler(event, formElement)}
        valueType={formElement.config.elementConfig.placeholder}
      />
    ));

    if (this.props.isLoading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      let errorOutput = '';

      switch (this.props.error.message) {
        case 'EMAIL_EXISTS':
          errorOutput = 'A user already exists with this e-mail address';
          break;
        case 'INVALID_EMAIL':
          errorOutput = 'Please supply a valid e-mail address';
          break;
        case 'EMAIL_NOT_FOUND':
          errorOutput = 'No such e-mail address registered';
          break;
        default:
          errorOutput = this.props.error.message;
      }

      errorMessage = <p>{errorOutput}</p>;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}

        <form onSubmit={this.submitHanlder}>
          {form}
          <Button buttonType="Success">Submit </Button>
        </form>
        <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
