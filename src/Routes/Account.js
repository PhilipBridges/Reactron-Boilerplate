import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql, compose, ApolloConsumer } from 'react-apollo'

import client from '../apollo'

import {
  Button
} from 'react-desktop/windows';

export class Account extends Component {
  logout({ cache }) {
    cache.writeData({ data: { logged: false } })
    this.props.history.replace('/login')
  }
  render() {
    const { username } = this.props.info
    return (
      <div>
        <h1 style={{ color: 'white', textAlign: 'center' }}>{username}</h1>
        <ApolloConsumer>
          {cache => (
            <div>
              <Button onClick={() => this.logout({ cache })}>Logout</Button>
              <Button onClick={() => console.log(this.props)}>Info</Button>
            </div>
          )}
        </ApolloConsumer>
      </div>
    )
  }
}

export default (Account)