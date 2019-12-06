import React, { Fragment, Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerClose = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Fragment>
        <Toolbar />
        <main className={classes.Content}>{this.props.children}</main>
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerClose} />
      </Fragment>
    );
  }
}

export default Layout;
