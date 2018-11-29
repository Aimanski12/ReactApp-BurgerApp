
import {put} from 'redux-saga/effects'
import { delay } from 'redux-saga'
// import * as actionTypes from '../actions/actionsTypes'

import * as actions from '../actions/index'

export function* logoutSaga(action){
  yield localStorage.removeItem('token')
  yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
  yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action){
  yield delay(action.expirationTime) 
  yield put(actions.logout())
}




// export default logoutSaga