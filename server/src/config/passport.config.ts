import bcrypt from 'bcryptjs'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import User from '../models/User.model'
import { Express } from 'express'

const LocalStrategy = passportLocal.Strategy

const passportConfig = (app: Express) => {
  app.use(
    session({
      secret: '7LpinfO0SnWPjgfeKIGf',
      resave: true,
      saveUninitialized: true,
    })
  )

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

  app.use(passport.initialize())
  app.use(passport.session())
}

export default passportConfig
