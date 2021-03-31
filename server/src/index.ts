import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import passportConfig from './config/passport.config'
import corsConfig from './config/cors.config'
import dbConfig from './config/db.config'
import routesDefinition from './routes'

dotenv.config()

// DB connection
dbConfig()

// Middleware
const app = express()

// App settings
passportConfig(app)

corsConfig(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
routesDefinition(app)

app.listen(process.env.PORT || 5000, () => {
  console.log('server started')
})

export default app
