import * as actionTypes from './actionsTypes'
// import axios from '../../axios.orders'


export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
}



export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
}


export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}


export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

 
export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
  // return dispatch => {
  //   axios.get('https://aimanski-my-burger.firebaseio.com/ingredients.json')
  //     .then(res => {
  //       // this.setState({ingredients: res.data})
  //       // console.log(res)
  //       dispatch(setIngredients(res.data));
  //     })
  //     .catch(err => {
  //       dispatch(fetchIngredientsFailed())
  //       // this.setState({error: true})
  //     })
  // }
}