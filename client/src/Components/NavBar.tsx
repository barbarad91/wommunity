import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@mdi/react'
import { mdiMenu, mdiChevronLeft } from '@mdi/js'
import { useContext, useState } from 'react'
import { Drawer } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { loggedUserContext } from 'src/Pages/userContext'
import clsx from 'clsx'
import BarMenu from './BarMenu'

const NavBar = () => {
  const classes = useStyles()

  const { user } = useContext(loggedUserContext)
  const userIsEmpty = !Object.keys(user).length

  const [open, setOpen] = useState(false)

  const handleClickMenu = () => {
    setOpen(!open)
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {!userIsEmpty && (
            <>
              <IconButton
                edge="start"
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                color="inherit"
                aria-label="menu"
                onClick={handleClickMenu}
              >
                <Icon path={mdiMenu} size={1} />
              </IconButton>
            </>
          )}
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            Wommunity
          </Typography>
        </Toolbar>
      </AppBar>

      {!userIsEmpty && (
        <Drawer
          variant="permanent"
          classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleClickMenu}>
              <Icon path={mdiChevronLeft} size={1} />
            </IconButton>
          </div>
          <BarMenu />
        </Drawer>
      )}
    </div>
  )
}

const useStyles = makeStyles(({ breakpoints, mixins, palette, spacing, transitions, zIndex }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: spacing(3), // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...mixins.toolbar,
    },
    appBar: {
      zIndex: zIndex.drawer + 1,
      transition: transitions.create(['width', 'margin'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: spacing(30),
      width: `calc(100% - ${spacing(30)}px)`,
      transition: transitions.create(['width', 'margin'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: spacing(4),
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none',
      color: 'inherit',
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: spacing(30),
      transition: transitions.create('width', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: transitions.create('width', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
      width: spacing(7),
      [breakpoints.up('sm')]: {
        width: spacing(9),
      },
    },
    styledMenuItem: {
      '&:focus': {
        backgroundColor: palette.primary.light,
      },
    },
  })
)

export default NavBar
