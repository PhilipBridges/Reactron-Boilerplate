import React, { Component } from 'react'

import { TextInput, Text } from 'react-desktop/windows';

export class Chatbox extends Component {
  state = {
    text: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.messages) {
      return {
        id: nextProps.id,
        messages: nextProps.messages
      }
    }
    return null
  }

  handleSubmit(e) {
    e.preventDefault()
    const message = {
      name: 'Borb',
      id: this.state.id,
      time: '2:51pm',
      text: this.state.text
    }

    this.setState({
      messages: [...this.state.messages, message],
      id: this.state.id + 1,
      text: ''
    })
  }

  handleChange(e) {
    this.setState({ text: e.currentTarget.value })
  }

  render() {
    return (
      <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Text
          background={this.props.color}
          theme={this.props.theme}
          color="white"
          style={{ width: '50vw', display: 'flex', flexDirection: 'column' }}
        >
          {this.state.messages && this.state.messages.map(msg => (
            <div key={msg.id}>
              <span>({msg.time}) {msg.name}:</span> <span>{msg.text}</span>
              <br />
            </div>
          ))}
        </Text>
        <form onSubmit={(e) => this.handleSubmit(e)} style={{ position: 'fixed', bottom: '0' }}>
          <input
            placeholder=""
            onChange={(e) => this.handleChange(e)}
            style={{ display: 'flex' }}
            value={this.state.text}
          />
        </form>
      </div>
    )
  }
}

export default Chatbox
