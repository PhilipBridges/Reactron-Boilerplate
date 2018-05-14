import React from 'react';
import http from 'https'
import path from 'path'

class Home extends React.Component {
  state = {
    images: []
  }

  componentDidMount() {
    const res = fetch('https://api.imgur.com/3/gallery/r/pics/top/day/1',
      {
        headers: {
          "Authorization": "Client-ID 13b7251c898d926"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => this.setState({ images: data.data }))
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
        {this.state.images.map(image => {
          const noExt = image.link.substring(0, image.link.lastIndexOf('.')) + 'm'
          const regEx = /(?:\.([^.]+))?$/
          const ext = regEx.exec(image.link)[1]
          const link = (`${noExt}.${ext}`)
          return <img style={{ maxHeight: '200px', maxWidth: '200px' }} key={image.id} src={link}/>
        })}
      </div>)
  }
}

export default Home