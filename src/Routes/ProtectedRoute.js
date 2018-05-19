import React from 'react'
import {
  Route,
  Redirect,
  Link,
} from 'react-router-dom'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PrivateRoute = ({ component: Component, data, ...rest }) => (
  <Route
    {...rest}
    data={data}
    render={props =>
      (
        <Component {...data} {...props}/>
      )}
  />
)

class ProtectedRoute extends React.Component {
  render() {
    return <PrivateRoute data={this.props.data} {...this.props}/>
  }
}

const CHECK_LOGIN = gql`
  {
    logged @client
  }
`;

const newRoute = graphql(CHECK_LOGIN)(PrivateRoute)

export default graphql(CHECK_LOGIN)(ProtectedRoute)