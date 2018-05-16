import React from 'react';
import http from 'https'
import path from 'path'

class Home extends React.Component {
  state = {
    images: []
  }

  handleClick() {
    const res = fetch('https://api.imgur.com/3/gallery/hot/viral/day/1?showViral=true&mature=false&album_previews=false'
      ,
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <button onClick={() => this.handleClick()}>Click</button>
        {this.state.images.map(img => {
          if (!img.is_album && !img.images_count && !img.animated) {
            return (
              <div key={img.id} style={{ padding: '10px' }}>
                <img style={{ maxWidth: '200px', maxHeight: '150px' }} src={img.link} alt="" />
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
}

export default Home