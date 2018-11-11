

import * as actionTypes from './actionsTypes'
// import order from '../../components/Order/Order/Order';
import axios from  '../../axios.orders'


// synchronous functions
export const purchaseBurgerSuccess = (id, orderData) => {
   return {
     type: actionTypes.PURCHASE_BURGER_SUCCESS,
     orderId: id,
     orderData: orderData
   }
};

// synchronous functions
export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}





// asynchronous functions
export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post( '/orders.json', orderData )
            .then( response => {
                console.log('response data aqui: ', response.data)
                dispatch(purchaseBurgerSuccess(response.data, orderData))
                // this.setState( { loading: false } );
                // this.props.history.push( '/' );
            } )
            .catch( error => { 
              dispatch(purchaseBurgerFailed(error))
                // this.setState( { loading: false } );
            } );
  }
}