import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price
}) => {
  return (
    <div className={classes.BuildControls}>
      Current Price: <strong> {`£${price.toFixed(2)}`}</strong>
      {controls.map(control => {
        return (
          <BuildControl
            added={() => ingredientAdded(control.type)}
            removed={() => {
              ingredientRemoved(control.type);
            }}
            disabled={disabled[control.type]}
            key={control.label}
            label={control.label}
          />
        );
      })}
    </div>
  );
};

export default BuildControls;
