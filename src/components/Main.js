import React from 'react'
import Signup from './Signup' ;
import { Landingpage } from './Landingpage';
import {Switch , Route} from 'react-router-dom';
const  Main = () => (
      <main>
          <Switch>
              <Route exact path='/' component={Landingpage}/>  
              <Route exact path='/signup' component={Signup}/>                
          </Switch>
      </main>
    )
  


export default Main ;
