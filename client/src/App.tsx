import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Adminpage from './Pages/Adminpage'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Profile from './Pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Homepage}></Route>
        <Route path="/admin" component={Adminpage}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/profile" exact component={Profile}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
