

import * as actionTypes from './actionsTypes'
// import order from '../../components/Order/Order/Order';
// import axios from  '../../axios.orders'


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



export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}




// asynchronous functions
export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token
  }
  // console.log('orderData: ', orderData)
  // return dispatch => {
  //   dispatch(purchaseBurgerStart());
  //   axios.post( '/orders.json?auth=' + token, orderData )
  //   .then( response => {
  //     // console.log('token: ', token)
  //               // console.log('response data aqui: ', response)
  //               dispatch(purchaseBurgerSuccess(response.data.name, orderData))
  //               // this.setState( { loading: false } );
  //               // this.props.history.push( '/' );
  //           } )
  //           .catch( error => { 
  //             console.log('error: ', error)
  //             dispatch(purchaseBurgerFailed(error))
  //               // this.setState( { loading: false } );
  //           } );
  // }
}


export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}



////////////////////////////////////////////
////////////////////////////////////////////
// action creators for the orders Menu


// synchronous codes
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}


// asynchronous codes
export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId
  }
  // return dispatch => {
  //   dispatch(fetchOrderStart())
  //   const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
  //   axios.get('/orders.json' + queryParams)
  //   .then(res => {
  //     // console.log('response data: ', res.data)
  //     const fetchedOrders = []
  //       for( let key in res.data ) {
  //         fetchedOrders.push({
  //           ...res.data[key],
  //           id: key
  //         })
  //       }
  //         dispatch(fetchOrdersSuccess(fetchedOrders))
  //         // this.setState({loading: false, orders: fetchedOrders});
  //         // console.log('response data: ', fetchedOrders)
  //   })
  //   .catch(err => {
  //     dispatch(fetchOrdersFail(err))
  //     // this.setState({loading: false});
  //   })
  // }
}

