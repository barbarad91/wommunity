import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'
import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
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
            <MenuItem className={classes.styledMenuItem} onClick={handleClose} component={Link} to="/profile">
              Profile
            </MenuItem>
          </Menu>
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
