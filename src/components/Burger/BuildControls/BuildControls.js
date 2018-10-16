
import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'


const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map(contrl => (
      <BuildControl 
        added={() => props.ingredientsAdded(contrl.type)}
        removed ={() => props.ingredientsRemoved(contrl.type)}
        key={contrl.label} 
        label={contrl.label}
        disabled={props.disabled[contrl.type]}
        />
    ))}
  </div>
)


export default buildControls