import React from 'react';
import http from 'https'
import path from 'path'

class Other extends React.Component {
  state = {
    images: [
      {
        link: 'https://pbs.twimg.com/profile_images/625769159339737088/2dwpQAXA_400x400.jpg'
      },
      {
        link: 'https://pbs.twimg.com/profile_images/630664501776527361/nIK2xTUE_400x400.jpg'
      },
      {
        link: 'http://myhswm.org/images/sized/images/animals/Sylvester-HSWM-9-256x256.jpg'
      },
      {
        link: 'http://myhswm.org/images/sized/images/animals/Eve-256x256.JPG'
      },
      {
        link: 'http://meowbaari.com/wp-content/uploads/2016/06/1464933654_cat_sleep.png'
      },
      {
        link: 'https://a.wattpad.com/useravatar/missy-cat.256.470217.jpg'
      },
    ]
  }

  handleClick() {

  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
        {this.state.images.map(x => (
          <img key={x.link} src={x.link} alt="" />
        ))}
      </div>
    )
  }
}

export default Other