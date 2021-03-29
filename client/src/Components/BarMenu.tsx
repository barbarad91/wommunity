import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@mdi/react'

import { mdiAccount, mdiLogoutVariant } from '@mdi/js'
import { List } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { useLoggedUserContext } from 'src/Pages/LoggedUserContext'
import AuthService from 'src/Services/auth.service'

const BarMenu = () => {
  const { setUser } = useLoggedUserContext()

  const authService = new AuthService()

  const signOut = async () => {
    await authService.signOut()
    setUser(undefined)
  }

  return (
    <List>
      <ListItem component={Link} to="/profile">
        <ListItemIcon>
          <Icon path={mdiAccount} size={1} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={signOut}>
        <ListItemIcon>
          <Icon path={mdiLogoutVariant} size={1} />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
    </List>
  )
}

export default BarMenu
