import { Router } from 'express'

import { Router as developerRouter } from '@/Domain/Developers'

const routes = Router()

routes.use('/developer', developerRouter)

export default routes
