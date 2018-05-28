import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment'

import { TextInput, Text } from 'react-desktop/windows';

export class Chatbox extends Component {
  state = {
    text: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.messages) {
      return {
        id: nextProps.id,
      }
    }
    return null
  }

  async handleSubmit(e) {
    e.preventDefault()
    const response = await this.props.postMutation({
      variables: {
        text: this.state.text
      }
    })
    this.setState({ text: '' })
  }

  handleChange(e) {
    this.setState({ text: e.currentTarget.value })
  }

  render() {
    return (
      <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <Query
          query={CHAT_QUERY}
        >
          {({ loading, data, subscribeToMore, fetchMore }) => {
            if (loading) {
              return null
            }
            subscribeToMore({
              document: POST_SUBSCRIPTION,
              variables: {},
              updateQuery: (prev, { subscriptionData }) => {
                const newMessage = subscriptionData.data.feedSubscription.node
                const prevList = prev.feed.filter(msg => msg.id !== newMessage.id)
                if (!subscriptionData) return prev;
                return {
                  feed: [...prevList, newMessage]
                }
              }
            })
            return (
              <Text
                background={this.props.color}
                theme={this.props.theme}
                color="white"
                style={{ width: '50vw', display: 'flex', flexDirection: 'column' }}
              >
                {data.feed.map(msg => {
                  return (<div key={msg.id}>
                    <span style={{fontSize: '10px'}} >({moment(msg.createdAt).format('MMMM Do, h:mm:ss a')}) </span> <span>{msg.author.name}: {msg.text}</span>
                    <br />
                  </div>
                  )
                })}
              </Text>
            )
          }}
        </Query>
        <form onSubmit={(e) => this.handleSubmit(e)} style={{ position: 'fixed', bottom: '0' }}>
          <input
            placeholder=""
            onChange={(e) => this.handleChange(e)}
            style={{ display: 'flex' }}
            value={this.state.text}
          />
        </form>
        <div id="bottom"></div>
      </div>
    )
  }
}

const POST_MUTATION = gql`
  mutation($text: String!){
    createPost(text: $text){
      id
       text
      }
    }
  `
const POST_SUBSCRIPTION = gql`
  subscription {
    feedSubscription {
      node {
        id
        text
        createdAt
        author {
          id
          name
        }
      }
    }
  }
  `

const CHAT_QUERY = gql`
  query {
    feed(orderBy: createdAt_ASC){
      id
      text
      createdAt
      author {
        id
        name
      }
    }
  }
  `

export default graphql(POST_MUTATION, {
  name: 'postMutation'
})(Chatbox)
