import React, { Component } from 'react'

import ChatBox from '../Components/Chatbox'

import gql from "graphql-tag";

import client from '../apollo'

export class Chat extends Component {
  componentDidMount() {
    client
      .query({
        query: gql`
      {
        users {
          name
        }
      }
    `
      })
      .then(result => console.log(result));
  }
  render() {
    return (
      <div>
        <ChatBox id={0} messages={[]} />
      </div>
    )
  }
}

export default Chat