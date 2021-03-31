import { Express } from 'express'
import authRouter from './auth.routes'
import healthcheckRouter from './healthcheck.routes'

const routesDefinition = (app: Express) => {
  app.use('/api/auth', authRouter)
  app.use('/api/healthcheck', healthcheckRouter)
}

export default routesDefinition
