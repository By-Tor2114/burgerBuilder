import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ drawerToggler, isAuth }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggler} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
