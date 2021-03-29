import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import React, { useContext, useState } from 'react'
import AuthService from 'src/Services/auth.service'
import { loggedUserContext } from 'src/Pages/userContext'
import { useHistory } from 'react-router'

type SignInFormProps = {
  formClass?: string
  submitClass?: string
  history?: any
}

const SignInForm = ({ formClass, submitClass }: SignInFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const { setUser } = useContext(loggedUserContext)
  const authService = new AuthService()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log('in')
      const userData = await authService.signIn({ username, password })
      console.log(userData)
      setUser(userData.data)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className={formClass} noValidate onSubmit={handleSubmit}>
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
    </form>
  )
}

export default SignInForm
