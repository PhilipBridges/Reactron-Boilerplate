import React, { Component } from 'react'

import { TextInput } from 'react-desktop/windows';

export class componentName extends Component {
  render() {
    return (
      <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{position: 'fixed', bottom: '0'}}>
          <TextInput
            ref="input"
            background
            label="My Input"
            placeholder="My Input"
            onChange={this.handleChange}
            style={{display: 'flex', width: '40vw'}}
          />
        </div>
      </div>
    )
  }
}

export default componentName