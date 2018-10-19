

import React from 'react'
import Main from '../../../Fragment/Fragments'
import Button from '../../UI/Button/Button'

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
      <p><strong>Total price: $ {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>

    </Main>
  )
}

export default orderSummary

