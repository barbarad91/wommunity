import { useContext } from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router'
import { loggedUserContext } from 'src/Pages/userContext'

const AdminRoute = ({ component: Component, ...otherProps }: RouteProps) => {
  const { user } = useContext(loggedUserContext)
  return (
    <Route
      render={(otherProps: RouteComponentProps) =>
        user && user.isAdmin && Component ? <Component {...otherProps} /> : <Redirect to="/" />
      }
    ></Route>
  )
}

export default AdminRoute
