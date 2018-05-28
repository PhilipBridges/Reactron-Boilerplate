import React, { Component } from 'react'

export class Home extends Component {
  render() {
    return (
      <div style={{ flexDirection: 'column', textAlign: 'center', color: 'white' }} >
        <h1>Welcome, {this.props.info.username}!</h1>
      </div>
    )
  }
}

export default Home
