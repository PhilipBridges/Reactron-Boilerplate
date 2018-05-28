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
  Button
} from 'react-desktop/windows';
import { FriendBar } from '../Components/RDRip/'

import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ProtectedRoute from './ProtectedRoute'
import { routes } from './index'

const { app } = window.require('electron').remote;
const remote = window.require('electron').remote;
const currentWindow = remote.getCurrentWindow()

const style = {
  overflow: 'auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column-reverse'
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
    const { location, data } = this.props; // eslint-disable-line
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
        >

        </TitleBar>
        <Window theme={theme} color={color}>

          <NavPane openLength={200} push theme={theme} color={color}>
            {routes.map((route) => {
              if ((route.title === 'Login' && data.logged)
                ||
                (route.title === 'Register' && data.logged)) {
                return <NavPaneItem key={'none'} push={false} />
              }
              if ((route.title !== 'Login' && !data.logged)
                &&
                (route.title !== 'Register')) {
                return <NavPaneItem key={'none'} push={false} />
              }
              return (<NavPaneItem
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
                style={{
                  overflow: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection:
                    route.title !== 'Home'
                      && route.title !== 'Login'
                      && route.title !== 'Account'
                      ? 'column-reverse' : 'column'
                }}
              > {(route.path !== '/login' && route.path !== '/register') ? (
                // Renders all routes as protected unless it's the login route
                <ProtectedRoute user={this.props} component={route.component} exact={route.exact} path={route.path} />
              )
                :
                (
                  <Route component={route.component} exact={route.exact} path={route.path} />
                )
                }
              </NavPaneItem>
              )
            })}

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

const CHECK_LOGIN = gql`
  {
    logged @client
    info {
      id @client
      username @client
    }
  }
`;

export default compose(
  graphql(CHECK_LOGIN), withRouter)(IndexRouter)