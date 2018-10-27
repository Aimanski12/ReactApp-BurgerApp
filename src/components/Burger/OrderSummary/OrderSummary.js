

import React, {Component} from 'react'
import Main from '../../../Fragment/Fragments/Fragments'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  
  // this can be a functional component
  componentWillUpdate() {
    // console.log('[OrderSummary] willUpdate')
  }
  


  render (){
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        
      })
    return(
      <Main>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}        
        </ul>
        <p><strong>Total price: $ {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>Cancel</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
    
      </Main>


    )
  }
  

}

export default OrderSummary

