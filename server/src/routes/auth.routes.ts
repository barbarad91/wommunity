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
    res.status(400).json({ code: 400, message: 'Missing credentials' })
    return
  }

  if (password !== confirmPassword) {
    res.status(400).json({ code: 400, message: 'Passwords do not match' })
    return
  }

  User.findOne({ username }, async (error: Error, doc: UserInterface) => {
    if (error) {
      res.status(500).json({ code: 500, message: error.message })
      return
    }

    if (doc) res.status(409).json({ code: 409, message: 'User already exists' })

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
        res.status(500).json({ code: 500, message: 'An error ocurred during sign up' })
      }
    }
  })
})

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', { failureFlash: true }, (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ code: 500, message: 'Error authenticating user' })
      return
    }

    if (!theUser) {
      res.status(401).json(failureDetails)
      return
    }

    const { username, isAdmin } = theUser
    req.login(theUser, (err) =>
      err ? res.status(500).json({ code: 500, message: 'Session error' }) : res.json({ username, isAdmin })
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
    res.status(500).json({ code: 500, message: 'An error occured during sign out' })
  }
})

// TODO:
// Create middleware
router.post('/deleteuser', async (req, res) => {
  try {
    await User.deleteOne({ username: req.body.username })
    res.send('Account deleted')
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

export default router
