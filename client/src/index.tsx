import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import theme from './Components/theme'
import UserContext from './Pages/userContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </UserContext>
  </React.StrictMode>,
  document.getElementById('root')
)
