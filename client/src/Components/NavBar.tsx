import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'
import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { loggedUserContext } from 'src/Pages/userContext'
import AuthService from 'src/Services/auth.service'

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const classes = useStyles()

  const { user, setUser } = useContext(loggedUserContext)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const authService = new AuthService()

  const signOut = async () => {
    setAnchorEl(null)
    const userData = await authService.signOut()
    setUser(userData.data)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <Icon path={mdiMenu} size={1} />
              </IconButton>

              <Menu id="nav-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem
                  key="menu-profile"
                  className={classes.styledMenuItem}
                  onClick={handleClose}
                  component={Link}
                  to="/profile"
                >
                  Profile
                </MenuItem>
                {user.isAdmin && (
                  <MenuItem
                    key="menu-profile"
                    className={classes.styledMenuItem}
                    onClick={handleClose}
                    component={Link}
                    to="/profile"
                  >
                    Admin
                  </MenuItem>
                )}
                <MenuItem
                  key="menu-signout"
                  className={classes.styledMenuItem}
                  onClick={signOut}
                  component={Link}
                  to="/"
                >
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          )}

          <Typography variant="h6" className={classes.title} component={Link} to="/">
            Wommunity
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: spacing(2),
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: 'inherit',
    },
    styledMenuItem: {
      '&:focus': {
        backgroundColor: palette.primary.light,
      },
    },
  })
)

export default NavBar
