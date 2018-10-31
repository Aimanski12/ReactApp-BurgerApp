import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios.orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country '
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
      },
    loading: false,
    ingredients: {}
  }

  orderHandler = (event) => {
      event.preventDefault()
     this.setState({loading: true})

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value 
    }

     const order = {
       ingredients: this.props.ingredients,
       price: this.props.price,
       orderData: formData
      // //  customer: {
      // //    name: 'Manski',
      // //    address: {
      // //      street: '101 street',
      // //      zipCode: '12345',
      // //      country: 'US'
      // //    },
      // //    email: 'test@test.com'
      // //  },
      //  deliveryMethod: 'fastest1'
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

  inputChangedHandler =(event, inputIdentifier) => {
    // console.log(event.target.value)
    const updatedOrderForm = {
      ...this.state.orderForm  
    }

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({orderForm: updatedOrderForm })
  }

  render() {

    const formElementsArray = [];

    for(let key in this.state.orderForm){
      // console.log('form keys: ', this.state.orderForm[key])
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
      // console.log('formElements: ', formElementsArray)
    
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            changed={(event)=> this.inputChangedHandler(event, formElement.id)}
            key={formElement.id} />
          ))}


          <Button btnType="Success">Order Now</Button>
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