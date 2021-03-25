import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Adminpage from './Pages/Adminpage'
import Homepage from './Pages/Homepage'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Copyright from './Components/Copyright'
import Context from './Pages/Context'

function App() {
  return (
    <BrowserRouter>
      <Context>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Homepage}></Route>
          <Route path="/admin" component={Adminpage}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/profile" component={Profile}></Route>
        </Switch>
        <Copyright />
      </Context>
    </BrowserRouter>
  )
}

export default App
