import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, slug, ...rest }) => {
  const isLogin = useSelector((state) => state.reducerUsers.isLogin);
  return (
    <Route
      {...rest}
      render={(props) => (isLogin ? <Component {...props} slug={slug} /> : <Redirect to="/sign-in" />)}
    />
  );
};
export default PrivateRoute;
