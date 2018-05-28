import React, { Component } from 'react'

export class Home extends Component {
  state = {
    visible: false,
    muted: true,
  }
  render() {
    return (
      <div>
        <button
          style={{ display: 'block', position: 'absolute' }}
          onClick={() => this.setState({ visible: !this.state.visible, muted: !this.state.muted })}
        >
          {this.state.muted ? 'Unmute' : 'Mute'}
          </button>
        {this.state.visible &&
          <webview style={{height: '0px', width: '0px'}} src="http://localhost:8080"></webview>
        }
      </div>
    )
  }
}

export default Home
