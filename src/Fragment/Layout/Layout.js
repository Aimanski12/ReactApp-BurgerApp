import React, {Component} from 'react';
import classes from './Layout.css';
import Main from '../Fragments/Fragments';
import Toolbar from  '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
      showSideDrawer: true
    }
    sideDrawerCloseHandler = () => {
      this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer}
      }) 
    }

   render() {
     return (
      <Main>
        <Toolbar  drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
          closed={this.sideDrawerCloseHandler}
          open={this.state.showSideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Main>
     )
   }


} 

export default Layout;