import bcrypt from 'bcryptjs'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import User from '../models/User.model'
import { Express } from 'express'
import flash from 'connect-flash'
import { UserInterface } from 'src/Interfaces/User.interface'
import MongoStore from 'connect-mongo'

const LocalStrategy = passportLocal.Strategy

const passportConfig = (app: Express) => {
  app.use(
    session({
      secret: '7LpinfO0SnWPjgfeKIGf',
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: `${process.env.MONGODB_URI}` }),
    })
  )

  app.use(flash())

  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async (_req, username, password, done) => {
      try {
        const theUser = await User.findOne({ username })
        const userData = (theUser as unknown) as UserInterface

        if (!theUser) {
          return done(null, false, { message: "This username doesn't exist" })
        }

        if (!bcrypt.compareSync(password, userData.password)) {
          return done(null, false, { message: 'Wrong password' })
        }

        return done(null, theUser)
      } catch (error) {
        return done(error, false)
      }
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
