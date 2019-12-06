import React, { Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
  return (
    <Fragment>
      <Toolbar /> <main className={classes.Content}>{props.children}</main>
      <SideDrawer />
    </Fragment>
  );
};

export default Layout;
