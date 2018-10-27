import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios.orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    ingredients: {}
  }

  orderHandler = (event) => {
      event.preventDefault()
     this.setState({loading: true})

     const order = {
       ingredients: this.props.ingredients,
       price: this.props.price,
       customer: {
         name: 'Manski',
         address: {
           street: '101 street',
           zipCode: '12345',
           country: 'US'
         },
         email: 'test@test.com'
       },
       deliveryMethod: 'fastest1'
     }
     axios.post('/orders.json', order)
       .then(response => {
        //  console.log('Order Response: ', response)
         // set the to false so that it will stop
         this.setState({ loading: true})
         this.props.history.push('/')
       })
       .catch(error => {
         console.log('Order Error: ', error)
         // set the to false so that it will stop
         this.setState({ loading: false})

       })
  }

  render() {

    let form = (<form action="">
          <input type="text" className={classes.Input} name="name" placeholder="Enter Name"/>
          <input 
            type="email"  
            className={classes.Input} 
            name="email" 
            placeholder="Enter Email"/>
          <input 
            type="text"  
            className={classes.Input} 
            name="street" 
            placeholder="Street"/>
          <input 
            type="text"  
            className={classes.Input} 
            name="postal" 
            placeholder="Postal Code"/>
          <Button 
            btnType="Success" 
            clicked={this.orderHandler}>Order Now</Button>
        </form>
      );

      if (this.state.loading) {
        form = <Spinner />
      }
    
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
          {form}
      </div>
    )
  }
}

export default ContactData