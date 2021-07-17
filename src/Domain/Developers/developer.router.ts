import { Router as ExpressRouter } from 'express'

import { Controller } from './developer.controller'

const controller = new Controller()
const router = ExpressRouter()

router.get('/', controller.index.bind(controller))
router.get('/:id', controller.show.bind(controller))

router.post('/', controller.store.bind(controller))

router.put('/:id', controller.update.bind(controller))

router.delete('/:id', controller.destroy.bind(controller))

export const Router = router
