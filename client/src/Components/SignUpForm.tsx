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

type SignUpFormProps = {
  formClass?: string
  submitClass?: string
}

const SignUpForm = ({ formClass, submitClass }: SignUpFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signUpError, setSignUpError] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const history = useHistory()

  const { setUser } = useLoggedUserContext()
  const authService = new AuthService()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignUpError('')
    try {
      const userData = await authService.signUp({ username, password, confirmPassword })
      setUser(userData.data)
      history.push('/')
    } catch (error) {
      setSignUpError(error.response.data.message)
      setSnackbarOpen(true)
    }
  }

  return (
    <>
      {signUpError && (
        <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
          <Alert severity="error">{signUpError}</Alert>
        </Snackbar>
      )}
      <form className={formClass} onSubmit={(e) => handleSubmit(e)}>
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
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" color="primary" className={submitClass}>
          Sign Up
        </Button>
      </form>
    </>
  )
}

export default SignUpForm
