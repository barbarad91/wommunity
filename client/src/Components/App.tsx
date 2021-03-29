import NavBar from './NavBar'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Adminpage from '../Pages/Adminpage'
import Homepage from '../Pages/Homepage'
import Profile from '../Pages/Profile'
import SignIn from '../Pages/SignIn'
import Copyright from './Copyright'
import { useLoggedUserContext } from '../Pages/LoggedUserContext'
import SignUp from '../Pages/SignUp'
import LoggedInRoute from './LoggedInRoute'
import LoggedOutRoute from './LoggedOutRoute'
import AdminRoute from './AdminRoute'

function App() {
  const { user } = useLoggedUserContext()
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          {user ? <Homepage /> : <Redirect to="signin" />}
        </Route>
        <LoggedOutRoute path="/signin" component={SignIn} />
        <LoggedOutRoute path="/signup" component={SignUp} />
        <LoggedInRoute path="/profile" component={Profile} />
        <AdminRoute path="/admin" component={Adminpage} />
      </Switch>
      <Copyright />
    </BrowserRouter>
  )
}

export default App
