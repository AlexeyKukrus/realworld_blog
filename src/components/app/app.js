import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from '../header/header';
import ArticleList from '../article-list/article-list';
import ArticleItemFull from '../article-item-full/article-item-full';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticleList} />
        <Route exact path="/articles" component={ArticleList} />
        <Route exact path="/articles/:slug" component={ArticleItemFull} />
      </Switch>
    </Router>
  );
};

export default App;
