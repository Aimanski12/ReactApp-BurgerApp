
import React, {Component} from 'react'
import classes from './Modal.css'

import Main from '../../../Fragment/Fragments/Fragments'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    // console.log('nextProps: ', nextProps)
    // console.log('nextState: ', nextState)

    return nextProps.show !== this.props.show
  }
  
  componentWillUpdate () {
    console.log('[Modal] WillUpdate')
  }

  render(){
    return(
      <Main>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        > 
          {this.props.children}
        </div>
      </Main>

    )
  }

}

export default Modal