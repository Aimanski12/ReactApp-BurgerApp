import React from 'react';
import classes from './Layout.css'
import Main from '../../Fragment/Fragments'
import Toolbar from  '../Navigation/Toolbar/Toolbar'

const layout = (props) => (
  <Main>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Main>
)

export default layout;