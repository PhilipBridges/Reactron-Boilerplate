import React, { Component } from 'react'
import { graphql, compose, Mutation, ApolloConsumer, Query } from 'react-apollo';
import gql from 'graphql-tag';

export class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <div>
        <Mutation mutation={loginMutation}>
          {(loginMutation, { data }) => (
            <ApolloConsumer>
              {cache => (
                <form onSubmit={async e => {
                  e.preventDefault();
                  const response = await loginMutation({
                    variables: {
                      password: this.state.password,
                      email: this.state.email
                    }
                  }).then((x) => { return x })

                  if (response.data.login) {
                    const { name, id } = response.data.login.user
                    await cache.writeData({ data: { logged: true, info: { __typename: 'Profile', id: id, username: name  } } })
                    this.props.history.replace('/')
                  }
                }}>
                  <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} id='email' type="text" />
                  <input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} id='password' type="text" />
                  <button type='submit'>Submit</button>
                </form>
              )}
            </ApolloConsumer>
          )}
        </Mutation>
        )}
      </div>
    )
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
      login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default Login