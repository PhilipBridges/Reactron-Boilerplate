import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom'

import { matchPath, withRouter } from 'react-router';

import {
  Window,
  TitleBar,
  NavPane,
  NavPaneItem,
} from 'react-desktop/windows';

import Home from './Home'
import Other from './Other'
import Chat from './Chat'
import Login from './Login'
import { FriendBar } from '../Components/RDRip/'

const { app } = window.require('electron').remote;
const remote = window.require('electron').remote;
const currentWindow = remote.getCurrentWindow()

const style = {
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
}

const list = [{
  name: 'Friend1',
  status: 'Online'
},
{
  name: 'Friend2',
  status: 'Offline'
}
]

const routes = [{
  path: '/',
  exact: true,
  title: 'Home',
  component: Home,
},
{
  path: '/other',
  exact: true,
  title: 'Other',
  component: Other,
},
{
  path: '/chat',
  exact: true,
  title: 'Chat',
  component: Chat,
},
{
  path: '/login',
  exact: true,
  title: 'Login',
  component: Login,
}
];

class IndexRouter extends React.Component {
  state = {
    isMaximized: false,
    theme: 'dark',
    color: '#cc7f29',
    friend: ''
  }

  toggleMaximize = () => {
    this.setState({ isMaximized: !this.state.isMaximized })
  }

  toggleTheme = () => {
    if (this.state.theme === 'dark') {
      return this.setState({ theme: light })
    }
    this.setState({ theme: 'dark' })
  }

  render() {
    const { location } = this.props; // eslint-disable-line
    const { replace } = this.props.history
    const { theme, color, selected } = this.state

    return (
      <React.Fragment>
        <TitleBar
          theme="dark"
          title="Electron"
          controls
          onCloseClick={() => app.quit()}
          onMinimizeClick={() => currentWindow.minimize()}
          onMaximizeClick={() => {
            currentWindow.maximize()
            this.toggleMaximize()
          }
          }
          onRestoreDownClick={() => {
            currentWindow.restore()
            this.toggleMaximize()
          }
          }
          isMaximized={this.state.isMaximized}
        />
        <Window theme={theme} color={color}>
          <NavPane openLength={200} push theme={theme} color={color}>
            {routes.map(route => (
              <NavPaneItem
                verticalAlignment="center"
                key={route.path}
                title={route.title}
                selected={Boolean(matchPath(location.pathname, {
                  exact: route.exact, strict: route.strict, path: route.path
                }))}
                onSelect={() => {
                  replace(route.path);
                }}
                color={color}
                background="rgb(12, 12, 12)"
                theme="light"
                padding="10px 20px"
                push
                style={style}
              >
                <Route exact={route.exact} path={route.path} component={route.component} />
              </NavPaneItem>
            ))}
          </NavPane>
          <FriendBar canPaneToggle={false} openLength={200} push theme={theme} color={color}>
            {list.map(friend => (
              <NavPaneItem
                key={friend.name}
                title={`${friend.name} - ${friend.status}`}
                selected={friend.name === this.state.friend}
                onSelect={() => {
                  this.setState({ friend: friend.name })
                }}
                color={color}
                background="rgb(12, 12, 12)"
                theme="light"
              />
            ))}
          </FriendBar>
        </Window>
      </React.Fragment>
    );
  }
}

export default withRouter(IndexRouter);