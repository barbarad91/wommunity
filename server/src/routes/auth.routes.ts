import bcrypt from 'bcryptjs'
import express, { Request, Response } from 'express'
import passport from 'passport'
import { UserInterface } from 'src/Interfaces/User.interface'
import User from '../models/User.model'

const router = express.Router()

router.post('/signup', async (req: Request, res: Response) => {
  // username, password
  const { username, password, confirmPassword } = req?.body

  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    res.send('Improper Values')
    return
  }

  if (password !== confirmPassword) {
    res.send('Passwords do not match')
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

        const createdUser = await User.create({ ...newUser })

        //TODO
        // Rename variable
        const bb = (createdUser as unknown) as UserInterface
        res.send({ username: bb.username, isAdmin: bb.isAdmin })
      } catch (error) {
        res.send('There was an error during sign up')
      }
    }
  })
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', { failureFlash: true }, (err, theUser, failureDetails) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: 'Error authenticating user' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    console.log(theUser)
    const { username, isAdmin } = theUser
    req.login(theUser, (err) =>
      err ? res.status(500).json({ message: 'Session error' }) : res.json({ username, isAdmin })
    )
  })(req, res, next)
})

router.get('/user', (req, res) => {
  if (req.user) {
    const { username, isAdmin } = req.user as UserInterface
    res.send({ username, isAdmin })
  } else {
    res.send(undefined)
  }
})

router.get('/signout', (req, res) => {
  req.logout()
  if (!req.user) {
    res.send(req.user)
  } else {
    res.send('There was an error during sign out')
  }
})

export default router
