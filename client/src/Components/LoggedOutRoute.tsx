import { useContext } from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router'
import { loggedUserContext } from 'src/Pages/userContext'

const LoggedOutRoute = ({ component: Component, ...otherProps }: RouteProps) => {
  const { user } = useContext(loggedUserContext)

  const userIsEmpty = !Object.keys(user).length
  return (
    <Route
      render={(otherProps: RouteComponentProps) =>
        Component && userIsEmpty ? <Component {...otherProps} /> : <Redirect to="/" />
      }
    ></Route>
  )
}

export default LoggedOutRoute
