import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router'
import { useLoggedUserContext } from 'src/Pages/LoggedUserContext'

const LoggedOutRoute = ({ component: Component, ...otherProps }: RouteProps) => {
  const { user } = useLoggedUserContext()

  return (
    <Route
      {...otherProps}
      render={(routeProps: RouteComponentProps) =>
        Component && !user ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    ></Route>
  )
}

export default LoggedOutRoute
