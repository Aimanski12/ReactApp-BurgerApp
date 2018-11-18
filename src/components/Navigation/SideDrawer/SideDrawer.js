

import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Main from '../../../Fragment/Fragments/Fragments'


const sideDrawer = (props) => {
  //... attach css classes

  let attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (


    <Main>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>

    </Main>
  )
}

export default sideDrawer;

