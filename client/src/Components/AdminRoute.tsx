import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router'
import { useLoggedUserContext } from 'src/Pages/LoggedUserContext'

const AdminRoute = ({ component: Component, ...otherProps }: RouteProps) => {
  const { user } = useLoggedUserContext()
  return (
    <Route
      {...otherProps}
      render={(routeProps: RouteComponentProps) =>
        user && user.isAdmin && Component ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    ></Route>
  )
}

export default AdminRoute
