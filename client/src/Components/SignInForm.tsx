import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import React, { useState } from 'react'
import AuthService from 'src/Services/auth.service'
import { useLoggedUserContext } from 'src/Pages/LoggedUserContext'
import { useHistory } from 'react-router'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'

type SignInFormProps = {
  formClass?: string
  submitClass?: string
}

const SignInForm = ({ formClass, submitClass }: SignInFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signInError, setSignInError] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const history = useHistory()

  const { setUser } = useLoggedUserContext()
  const authService = new AuthService()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignInError('')
    try {
      const userData = await authService.signIn({ username, password })
      setUser(userData.data)
      history.push('/')
    } catch (error) {
      setSignInError(error.response.data.message)
      setSnackbarOpen(true)
    }
  }

  return (
    <>
      {signInError && (
        <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
          <Alert severity="error">{signInError}</Alert>
        </Snackbar>
      )}
      <form className={formClass} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setUsername(e.target.value)
            setSignInError('')
          }}
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
          onChange={(e) => {
            setPassword(e.target.value)
            setSignInError('')
          }}
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" color="primary" className={submitClass}>
          Sign In
        </Button>
      </form>
    </>
  )
}

export default SignInForm
