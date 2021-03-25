import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import React, { useState } from 'react'
import AuthService from 'src/Services/auth.service'

type SignInFormProps = {
  formClass?: string
  submitClass?: string
}

const SignInForm = ({ formClass, submitClass }: SignInFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authService = new AuthService()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await authService.signIn({ username, password })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <form className={formClass} noValidate onSubmit={(e) => handleSubmit(e)}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
      <Button type="submit" fullWidth variant="contained" color="primary" className={submitClass}>
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignInForm
