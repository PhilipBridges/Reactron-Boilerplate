import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import { matchPath, withRouter } from 'react-router';

import {
  Window,
  TitleBar,
  NavPane,
  NavPaneItem,
} from 'react-desktop/windows';

import Home from './Home'
import Test from './Test'
import Sidebar from '../Components/Sidebar'

const { app } = window.require('electron').remote;
const remote = window.require('electron').remote;
const currentWindow = remote.getCurrentWindow()

const routes = [{
  path: '/',
  exact: true,
  title: 'Home',
  component: Home,
}, {
  path: '/test',
  exact: true,
  title: 'Test',
  component: Test,
}];

class IndexRouter extends React.Component {
  state = {
    isMaximized: false
  }
  
  static defaultProps = {
    theme: 'dark',
    color: '#cc7f29',
  }
  

  toggleMaximize = () => {
    console.log(this.state)
    this.setState({ isMaximized: !this.state.isMaximized })
  }

  render() {
    const { location, theme, color } = this.props; // eslint-disable-line
    const { replace } = this.props.history

    return (
      <React.Fragment>
        <TitleBar
          theme="dark"
          title="My Windows Application"
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
                key={route.path}
                title={route.title}
                icon={route.icon}
                selected={Boolean(matchPath(location.pathname, route.path, {
                  exact: route.exact, strict: route.strict,
                }))}
                onSelect={() => {
                  replace(route.path);
                }}
                color={color}
                background="#ffffff"
                theme="light"
                padding="10px 20px"
                push
              >
                <Route exact={route.exact} path={route.path} component={route.component} />
              </NavPaneItem>
            ))}
          </NavPane>
        </Window>
      </React.Fragment>
    );
  }
}

export default withRouter(IndexRouter);