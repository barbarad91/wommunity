import express from 'express'
import { Express } from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import MongoStore from 'connect-mongo'
// import mongoose from 'mongoose'
import * as homeController from './controllers/home'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'
import connect from './connect'

dotenv.config()

// call express
const app: Express = express()

// Connect to MongoDB

const mongoUrl = MONGODB_URI
const port: number = Number(process.env.PORT) || 5000
const db: string = MONGODB_URI!

connect(db)

// Express configuration
app.set('port', process.env.PORT || 5000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: `${SESSION_SECRET}`,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
    }),
  })
)

/**
 * Primary app routes.
 */
app.get('/', homeController.index)

app.listen(port, () => {
  console.log(`Server running on ${port}`)
})
export default app
