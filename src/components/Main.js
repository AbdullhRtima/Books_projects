import React from 'react'
import Signup from './Signup' ;
import { Landingpage } from './Landingpage';
import {Switch , Route} from 'react-router-dom';
import { BookDetails } from './BookDetails';

const  Main = () => (
      <main>
          <Switch>
              <Route exact path='/' component={Landingpage}/>  
              <Route exact path='/signup' component={Signup}/> 
              <Route exact path='/books/details' component={BookDetails}/>                  
          </Switch>
      </main>
    )
  


export default Main ;
