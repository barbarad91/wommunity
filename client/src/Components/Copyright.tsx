import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { createStyles, makeStyles } from '@material-ui/core'

const Copyright = () => {
  const classes = useStyles()
  return (
    <div className={classes.footerContainer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>
        {` ${new Date().getFullYear()}.`}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    footerContainer: {
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    },
  })
)

export default Copyright
