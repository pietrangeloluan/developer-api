import 'reflect-metadata'

import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'
import compression from 'compression'

import '@/Shared/Database'

import { api as ApiConfig, app as AppConfig } from '@/Config'

import routes from '@/Shared/Routes'

class Server {
  public server: Application

  constructor() {
    this.server = express()

    this.setup()
  }

  private setup(): void {
    this.server.use(compression())
    this.server.use(cors())
    this.server.use(helmet())
    this.server.use(express.json())

    this.server.use('/api', routes)

    this.server.enable('trust proxy')
  }

  public listen(): void {
    console.log('')
    console.log('[API] ONLINE!')
    console.log(`[API] Mode: ${AppConfig.env}`)
    console.log(`[API] Port: ${ApiConfig.port}`)
    console.log('')
  }
}

export default () => new Server()
