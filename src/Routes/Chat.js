import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql, compose } from 'react-apollo'

import ChatBox from '../Components/Chatbox'

import client from '../apollo'

export class Chat extends Component {
  
  render() {
    return (
      <div>
        {console.log(this.props)}
        <ChatBox id={0} messages={[]} />
      </div>
    )
  }
}

const USER_QUERY = gql`
  query users {
    users {
      id
      name
    }
  }
`

export default graphql(USER_QUERY, {
  name: 'userQuery',
})(Chat)