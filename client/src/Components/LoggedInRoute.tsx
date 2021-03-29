import { useContext } from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router'
import { loggedUserContext } from 'src/Pages/userContext'

const LoggedInRoute = ({ component: Component, ...otherProps }: RouteProps) => {
  const { user } = useContext(loggedUserContext)
  return (
    <Route
      render={(otherProps: RouteComponentProps) =>
        user && Component ? <Component {...otherProps} /> : <Redirect to="/signin" />
      }
    ></Route>
  )
}

export default LoggedInRoute
