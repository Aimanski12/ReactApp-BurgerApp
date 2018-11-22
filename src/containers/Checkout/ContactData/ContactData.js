import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios.orders';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../Fragment/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

import {updateObject, checkValidity}  from '../../../shared/utility'

import {connect} from 'react-redux'



class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'Fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        // loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        // this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)
        // console.log('token: ', this.props.token)

        // axios.post( '/orders.json', order )
        //     .then( response => {
        //         this.setState( { loading: false } );
        //         this.props.history.push( '/' );
        //     } )
        //     .catch( error => {
        //         this.setState( { loading: false } );
        //     } );
    }

    // checkValidity(value, rules) {
    //     let isValid = true;
        
    //   if (!rules){
    //     return true
    //   }

    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }

    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }

    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }
    //     return isValid;
    // }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            // ...updatedOrderForm[inputIdentifier]
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation), 
            touched: true 
        })  
          
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })
        // updatedOrderForm = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                  // console.log(formElement.config.value)
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId:  state.auth.userId
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));

























































































// import React, { Component } from 'react'
// import Button from '../../../components/UI/Button/Button'
// import classes from './ContactData.css'
// import axios from '../../../axios.orders'
// import Spinner from '../../../components/UI/Spinner/Spinner'
// import Input from '../../../components/UI/Input/Input'

// class ContactData extends Component {

//   state = {
//     orderForm: {
//       name: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Your Name'
//         },
//         value: '',
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false
//       },
//       street: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Street'
//         },
//         value: '',
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false
//       },
//       zipCode: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'ZIP Code'
//         },
//         value: '',
//         validation: {
//           required: true,
//           minLength: 5,
//           maxLength: 5
//         },
//         valid: false,
//         touched: false
//       },
//       country: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Country '
//         },
//         value: '',
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false
//       },
//       email: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'email',
//           placeholder: 'Your Email'
//         },
//         value: '',
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false
//       },
//       deliveryMethod: {
//         elementType: 'select',
//         elementConfig: {
//           options: [
//             {value: 'fastest', displayValue: 'Fastest'},
//             {value: 'cheapest', displayValue: 'Cheapest'}
//           ]
//         },
//         value: '',
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false
//       }
//       },
//     loading: false,
//     ingredients: {}
//   }

//   orderHandler = (event) => {
//       event.preventDefault()
//      this.setState({loading: true})

//     const formData = {};
//     for (let formElementIdentifier in this.state.orderForm){
//       formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value 
//     }

//      const order = {
//        ingredients: this.props.ingredients,
//        price: this.props.price,
//        orderData: formData
//       // //  customer: {
//       // //    name: 'Manski',
//       // //    address: {
//       // //      street: '101 street',
//       // //      zipCode: '12345',
//       // //      country: 'US'
//       // //    },
//       // //    email: 'test@test.com'
//       // //  },
//       //  deliveryMethod: 'fastest1'
//      }
//      axios.post('/orders.json', order)
//        .then(response => {
//         //  console.log('Order Response: ', response)
//          // set the to false so that it will stop
//          this.setState({ loading: true})
//          this.props.history.push('/')
//        })
//        .catch(error => {
//          console.log('Order Error: ', error)
//          // set the to false so that it will stop
//          this.setState({ loading: false})

//        })
//   }

//   checkValidity(value, rules){
    
//     let isValid = true
//     // console.log('isValid: ', isValid)
//     // console.log('value: ', value)
//     if(rules.required){
//       isValid = value.trim() !== '' && isValid;
//     }
//     if(rules.minLength){
//       isValid = value.length >= rules.minLength && isValid
//     }
//     if(rules.maxLength){
//       isValid = value.length <= rules.maxLength && isValid
//     }


//     // console.log('isValid: ', isValid)
//     return isValid
//   }



//   inputChangedHandler =(event, inputIdentifier) => {
//     // console.log(event.target.value)
//     const updatedOrderForm = {
//       ...this.state.orderForm  
//     }

//     const updatedFormElement = {
//       ...updatedOrderForm[inputIdentifier]
//     };

//     updatedFormElement.value = event.target.value;
    
//     updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
//     console.log('updated form element: ', updatedFormElement)
    
//     updatedOrderForm[inputIdentifier] = updatedFormElement;

//     updatedFormElement.touched = true

//     this.setState({orderForm: updatedOrderForm })
//   }

//   render() {

//     const formElementsArray = [];

//     for(let key in this.state.orderForm){
//       // console.log('form keys: ', this.state.orderForm[key])
//       formElementsArray.push({
//         id: key,
//         config: this.state.orderForm[key]
//       })
//     }
//       // console.log('formElements: ', formElementsArray)
    
//     let form = (
//       <form onSubmit={this.orderHandler}>
//         {formElementsArray.map(formElement => (
//           <Input 
//             elementType={formElement.config.elementType} 
//             elementConfig={formElement.config.elementConfig} 
//             value={formElement.config.value}
//             changed={(event)=> this.inputChangedHandler(event, formElement.id)}
//             invalid={!formElement.config.valid}
//             shouldValidate={formElement.config.validation}
//             touched={formElement.config.touched}
//             key={formElement.id} />
//           ))
//         }


//           <Button btnType="Success">Order Now</Button>
//         </form>
//       );

//       if (this.state.loading) {
//         form = <Spinner />
//       }
    
//     return (
//       <div className={classes.ContactData}>
//         <h4>Enter your contact data</h4>
//           {form}
//       </div>
//     )
//   }
// }

// export default ContactData