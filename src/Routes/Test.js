import React from 'react';

class Test extends React.Component {
  render() {
    return (
      <div>
        <h2>It works</h2>
        <button onClick={() => this.props.history.replace('/')}>Click</button>
      </div>)
  }
}

export default Test