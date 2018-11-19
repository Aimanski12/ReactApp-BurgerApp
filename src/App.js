import React, { Component } from 'react';

import Layout from './Fragment/Layout/Layout'

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

import Checkout from './containers/Checkout/Checkout'

import {Route, Switch} from 'react-router-dom'

import Orders from './containers/Orders/Orders'

import Auth from './containers/Auth/Auth'

import Logout from './containers/Auth/Logout/Logout'

import {connect} from 'react-redux'

import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  // state = {
  //   show: true
  // }

  // componentDidMount () {
  //   setTimeout(()=> {
  //     this.setState({show: false})
  //   }, 5000)
  // }

  render() {
    return (
      <div >
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null } */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState())
    }
  }
}


export default connect(null, mapDispatchToProps) (App);
