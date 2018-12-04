import React from 'react'
import Signup from './Signup' ;
import { Landingpage } from './Landingpage';
import {Switch , Route} from 'react-router-dom';
import { BookDetails } from './BookDetails';
import {Login} from './Login' ;
import Profile from './Profile'
import Recovery from './Recovery'

const  Main = () => (
      <main>
          <Switch>
              <Route exact path='/' component={Landingpage}/>
              <Route exact path='/signup' component={Signup}/>
              <Route exact path='/books/details' component={BookDetails}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path = '/profile' component={Profile} />
              <Route exact path = '/recovery' component={Recovery} />
          </Switch>
      </main>
    )



export default Main ;
