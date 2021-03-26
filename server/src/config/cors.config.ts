import cors, { CorsOptions } from 'cors'
import { Express } from 'express'

const corsOptions: () => CorsOptions = () => ({
  origin: (origin, cb) => {
    const allowList = [process.env.DOMAIN]

    const originIsAllowed = allowList.includes(origin)

    cb(null, originIsAllowed)
  },
  credentials: true,
})

const corsConfig = (app: Express) => app.use(cors(corsOptions()))

export default corsConfig
