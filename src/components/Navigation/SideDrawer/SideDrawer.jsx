import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({ closed, open }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
