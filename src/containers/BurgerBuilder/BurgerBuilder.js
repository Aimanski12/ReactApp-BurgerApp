

import React, { Component } from 'react'; 
import Main from '../../Fragment/Fragments/Fragments'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import axios from '../../axios.orders'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../Fragment/withErrorHandler/withErrorHandler'

import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'




// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese : 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }

class BurgerBuilder extends Component {

  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = { 
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    // loading: false,
    // error: false
  }

  componentDidMount () {
    this.props.onInitIngredients()
    // console.log('Burger builder: ', this.props)
    // axios.get('https://aimanski-my-burger.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ingredients: res.data})
    //     // console.log(res)
    //   })
    //   .catch(err => {
    //     this.setState({error: true})
    //   })

  }

  updatePurchaseState(ingredients) {
   
    const sum = Object.keys(ingredients)
      .map(igKey => {
        // console.log('igKey: ', igKey)
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        // console.log('sum: ', sum)
        // console.log('el: ', el)
        return sum + el 
      }, 0);
      // this.setState({purchasable: sum > 0})
      return sum > 0;
  }


  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   // console.log('updated ingri: ', updatedIngredients)
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});  
  //   this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   });
  //   this.updatePurchaseState(updatedIngredients)
  // }


  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  
  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
    // console.log('burger ingredients: ', this.state.ingredients)
    // const queryParams = []
    //   for (let i in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //   }

    //   queryParams.push('price='+ this.state.totalPrice) 
    //   const queryString = queryParams.join('&')

    //   this.props.history.push({
    //     pathname: '/checkout',
    //     search: '?' + queryString
    //   })
    }

  // purchaseContinueHandler = () => {
  //   // alert('You continue')

  //   // set the loading to true so that we can use the spinner
  //   this.setState({loading: true})

  //   const order = {
  //     ingredients: this.state.ingredients,
  //     price: this.state.totalPrice,
  //     customer: {
  //       name: 'Manski',
  //       address: {
  //         street: '101 street',
  //         zipCode: '12345',
  //         country: 'US'
  //       },
  //       email: 'test@test.com'
  //     },
  //     deliveryMethod: 'fastest'
  //   }
  //   axios.post('/orders.json', order)
  //     .then(response => {
  //       console.log('Order Response: ', response)
  //       // set the to false so that it will stop
  //       this.setState({ loading: false, purchasing: false })
  //     })
  //     .catch(error => {
  //       console.log('Order Error: ', error)
  //       // set the to false so that it will stop
  //       this.setState({ loading: false, purchasing: false })
        
  //     })
  // }


  render() {
    const disabledInfo = {
      // ...this.state.ingredients 
      ...this.props.ings
    };
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    
    
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingedients can't be loaded</p> : <Spinner />
    
    if(this.props.ings){
      
      burger = (
        <Main>
        <Burger ingredients={this.props.ings}/>
        <BuildControls 
          ingredientsAdded = {this.props.onIngredientAdded}
          ingredientsRemoved = {this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler}
          />
      </Main>
    )
    
    orderSummary =  <OrderSummary 
    price={this.props.price}
    ingredients={this.props.ings}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}
    />
  }
  
  // if(this.state.loading){
  //   orderSummary = <Spinner />
  // }

    return (
      <Main>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Main>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onIngredientAdded: (ingName) => dispatch(
      actions.addIngredient(ingName)
      // type: actionTypes.ADD_INGREDIENT,
      // ingredientName: ingName 
    ),
    onIngredientRemoved: (ingName) => dispatch(
      actions.removeIngredient(ingName)
      // type: actionTypes.REMOVE_INGREDIENT,
      // ingredientName: ingName 
    ),
    onInitIngredients: () => dispatch( 
      actions.initIngredients()
    ),
    onInitPurchase: () => {
      dispatch(actions.purchaseInit())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
   