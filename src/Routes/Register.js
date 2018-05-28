import React, { Component } from 'react'
import { graphql, compose, Mutation, ApolloConsumer, Query } from 'react-apollo';
import gql from 'graphql-tag';

export class Register extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  render() {
    return (
      <div>
        <Mutation mutation={registerMutation}>
          {(registerMutation, { data }) => (
            <ApolloConsumer>
              {cache => (
                <form onSubmit={async e => {
                  e.preventDefault();
                  const response = await registerMutation({
                    variables: {
                      password: this.state.password,
                      email: this.state.email,
                      name: this.state.name
                    }
                  }).then((x) => { return x })

                  if (response.data.register) {
                    const { name, id } = response.data.signup.user
                    this.props.history.replace('/')
                  }
                }}>
                  <input placeholder='email' value={this.state.email} onChange={e => this.setState({ email: e.target.value })} id='email' type="text" />
                  <input placeholder='name' value={this.state.name} onChange={e => this.setState({ name: e.target.value })} id='email' type="text" />
                  <input placeholder='password' value={this.state.password} onChange={e => this.setState({ password: e.target.value })} id='password' type="text" />
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

const registerMutation = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default Register