import React from 'react'
import Signup from './Signup' ;
import { Landingpage } from './Landingpage';
import {Switch , Route} from 'react-router-dom';
import { BookDetails } from './BookDetails';
import {Login} from './Login' ;

const  Main = () => (
      <main>
          <Switch>
              <Route exact path='/' component={Landingpage}/>
              <Route exact path='/signup' component={Signup}/>
              <Route exact path='/books/details' component={BookDetails}/>
              <Route exact path='/login' component={Login}/>
          </Switch>
      </main>
    )



export default Main ;
