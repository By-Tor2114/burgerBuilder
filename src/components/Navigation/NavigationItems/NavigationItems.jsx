import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>

      {isAuthenticated ? (
        <NavigationItem link="/orders">Orders </NavigationItem>
      ) : null}

      {!isAuthenticated ? (
        <NavigationItem link="/auth">Login / Signup </NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
