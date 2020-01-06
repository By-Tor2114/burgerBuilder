import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClose = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(currentState => {
      return { showSideDrawer: !currentState.showSideDrawer };
    });
  };

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggler={this.sideDrawerToggleHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={showSideDrawer}
          closed={this.sideDrawerClose}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
