import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
  const isLogin = useSelector((state) => state.reducerUsers.isLogin);
  return <Route render={() => (isLogin ? <Component /> : <Redirect to="/sign-in" />)} />;
};

export default PrivateRoute;
