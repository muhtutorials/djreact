import React from  'react';
import { Switch, Route } from 'react-router-dom';

import ArticleList from './containers/ArticleList';
import ArticleDetail from './containers/ArticleDetail';
import Login from './containers/Login';
import Signup from './containers/Signup';


const BaseRouter = () => (
  <Switch>
    <Route exact path='/' component={ArticleList} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path='/:articleID' component={ArticleDetail} />
  </Switch>
);


export default BaseRouter;