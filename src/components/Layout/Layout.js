import React from 'react';
import classes from './Layout.css'
import Main from '../../Fragment/Fragments'

const layout = (props) => (
  <Main>
    {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
    <main className={classes.Content}>
      {props.children}
    </main>
  </Main>
)

export default layout;