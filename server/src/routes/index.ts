import { Express } from 'express'
import router from './auth.routes'

const routesDefinition = (app: Express) => {
  app.use('/api/auth', router)
}

export default routesDefinition
