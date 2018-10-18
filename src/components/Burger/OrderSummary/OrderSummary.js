

import React from 'react'
import Main from '../../../Fragment/Fragments'


const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
      
    })
  return (
    <Main>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}        
      </ul>
      <p>Continue to checkout?</p>
    </Main>
  )
}

export default orderSummary

