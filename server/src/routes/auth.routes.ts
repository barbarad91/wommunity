import bcrypt from 'bcryptjs'
import express, { Request, Response } from 'express'
import passport from 'passport'
import { UserInterface } from 'src/Interfaces/User.interface'
import User from '../models/User.model'

const router = express.Router()

router.post('/signup', async (req: Request, res: Response) => {
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

        const createdUser = await User.create({ ...newUser })
        res.send(createdUser)
      } catch (error) {
        res.json({ message: 'there was an error', error: { error } })
      }
    }
  })
})

router.post('/signin', passport.authenticate('local'), (req, res) => {
  if (req.user) {
    const { username, isAdmin } = req.user as UserInterface
    res.send({ username, isAdmin })
  } else {
    res.send('There was an error during sign in')
  }
})

router.get('/user', (req, res) => {
  if (req.user) {
    const { username, isAdmin } = req.user as UserInterface
    res.send({ username, isAdmin })
  } else {
    res.send('')
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
