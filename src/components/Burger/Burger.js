
import React from 'react';
import {withRouter} from 'react-router-dom'
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {
  console.log('Burger: ', props)
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
    // console.log('IgKey: ', igKey)
        return [...Array(props.ingredients[igKey])].map((_, i) => {
          console.log('the underscore', _)
          console.log('the index', i)
        return <BurgerIngredient key={igKey + i} type={igKey}/>
      })
    })


      .reduce((arr, el) => {
          // console.log('the ARR', arr)
          // console.log('the EL', el)
        return arr.concat(el)
      }, [])
      // console.log('transformed Ingredients: ', transformedIngredients)

      if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding your ingredients.</p>
      }
  return (
     <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
       {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
     </div>
  );
}

export default withRouter(burger);




































