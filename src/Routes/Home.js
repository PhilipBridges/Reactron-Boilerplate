import React from 'react';
import Sidebar from '../Components/Sidebar'

class Home extends React.Component {
  render() {
    return (
      <div >
        <h2>Welcome to React!</h2>
        <button onClick={() => this.props.history.replace('/test')}>Click</button>
      </div>)
  }
}

export default Home