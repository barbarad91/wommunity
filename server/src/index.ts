import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import session from 'express-session'
import mongoose, { Error } from 'mongoose'
import passport from 'passport'
import passportLocal from 'passport-local'
import { UserInterface } from './Interfaces/User.interface'

import User from './models/User.model'

const LocalStrategy = passportLocal.Strategy

mongoose.connect(
  `mongodb://localhost/wommunity`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err: Error) => {
    if (err) throw err
    console.log('Connected to Mongo')
  }
)

// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(
  session({
    secret: '7LpinfO0SnWPjgfeKIGf',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: Error, user: any) => {
      if (err) throw err

      if (!user) return done(null, false)

      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return done(null, user)
        } else return done(null, false)
      })
    })
  })
)

passport.serializeUser((user: any, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id: string, cb) => {
  User.findById(id, (err: Error, user: any) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin,
    }

    cb(err, userInformation)
  })
})

// Routes
app.post('/register', async (req: Request, res: Response) => {
  // username, password
  const { username, password } = req?.body

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    res.send('Improper Values')
    return
  }

  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err

    if (doc) res.send('User already exists')

    if (!doc) {
      try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
          username,
          password: hashedPassword,
        }

        await User.create({ ...newUser })
        res.send('success')
      } catch (error) {
        res.json({ message: 'there was an error', error: { error } })
      }
    }
  })
})

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Successfully Authenticated')
})

app.get('/user', (req, res) => {
  res.send(req.user)
})

app.listen(5000, () => {
  console.log('server started')
})
