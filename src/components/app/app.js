import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../header/header';
import ArticleList from '../article-list/article-list';
import ArticleItemFull from '../article-item-full/article-item-full';
import SignIn from '../sign-in/sign-in';
import SignUp from '../sign-up/sign-up';
import Profile from '../profile/profile';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/articles" component={ArticleList} />
        <Route exact path="/articles/:slug" component={ArticleItemFull} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
