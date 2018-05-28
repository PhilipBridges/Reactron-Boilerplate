import Home from './Home'
import Chat from './Chat'
import Login from './Login'
import Account from './Account'
import Register from './Register'


export const routes = [{
  path: '/',
  exact: true,
  title: 'Home',
  component: Home,
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
},
{
  path: '/account',
  exact: true,
  title: 'Account',
  component: Account,
},
{
  path: '/register',
  exact: true,
  title: 'Register',
  component: Register,
},
];