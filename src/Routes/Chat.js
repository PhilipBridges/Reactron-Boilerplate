import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql, compose } from 'react-apollo'

import ChatBox from '../Components/Chatbox'

import client from '../apollo'

export class Chat extends Component {

  render() {
    const { id, username } = this.props.info
    return (
      <div>
        <ChatBox username={username} id={id} messages={[]} />
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

export default Chat