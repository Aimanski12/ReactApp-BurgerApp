

import React from 'react'
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure ({adapter: new Adapter()})

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
     wrapper = shallow(<NavigationItems />)
  })

  it('should render two <NavigationItem /> elements si no authenticado', ()=> {
      // console.log('wrapper: ', wrapper)
      expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render three <NavigationItem /> elements si AUTHENTICADO', ()=> {
      // const wrapper = shallow(<NavigationItems isAuthenticated />)
      // console.log('wrapper: ', wrapper)
      wrapper.setProps({isAuthenticated: true})
      expect(wrapper.find(NavigationItem)).toHaveLength(3)
      // expect(wrapper.find(NavigationItem)).toBeFalsy()
  })


   it('should render <NavigationItem /> LOGOUT', ()=> {
      // const wrapper = shallow(<NavigationItems isAuthenticated />)
      // console.log('wrapper: ', wrapper)
      // wrapper.setProps({isAuthenticated: true})
      // expect(wrapper.find(NavigationItem)).toHaveLength(3)
      wrapper.setProps({
        isAuthenticated: true
      })
      expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
      // expect(wrapper.find(NavigationItem)).toBeFalsy()
  })

})