

import {takeEvery, takeLatest, all} from 'redux-saga/effects'

import * as actionTypes from '../actions/actionsTypes'
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth'

import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import { initIngredientsSaga } from './burgerBuilder';


export function* watchAuth(){
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ])
}


export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}