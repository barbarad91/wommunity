import NavBar from './Components/NavBar'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Adminpage from './Pages/Adminpage'
import Homepage from './Pages/Homepage'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Copyright from './Components/Copyright'
import { loggedUserContext } from './Pages/userContext'
import SignUp from './Pages/SignUp'
import { useContext } from 'react'

function App() {
  const ctx = useContext(loggedUserContext).user
  console.log('ctx', ctx)
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          {ctx ? <Homepage /> : <Redirect to="signin" />}
        </Route>

        {ctx ? (
          <>
            {ctx.isAdmin && <Route path="/admin" component={Adminpage}></Route>}
            <Route path="/profile" component={Profile}></Route>
          </>
        ) : (
          <>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/signin" component={SignIn}></Route>
          </>
        )}
      </Switch>
      <Copyright />
    </BrowserRouter>
  )
}

export default App
