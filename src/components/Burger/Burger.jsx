import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = ({ ingredients }) => {
  const transformedIngredients = Object.keys(ingredients).map(igKey => {
    return [...Array(ingredients[igKey])].map((_, index) => {
      return <BurgerIngredient key={igKey + index} type={igKey} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
