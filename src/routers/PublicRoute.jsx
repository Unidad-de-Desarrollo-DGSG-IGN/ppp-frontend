import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ 
  isAuthenticated,
  component: Component,
  ...rest
}) => {

  return (
    <Route 
      {...rest}
      component={ props => (
        isAuthenticated
          ? <Redirect to='/requests' />
          : <Component {...props}/>
      )}
    />
  )
}

export default PublicRoute

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}